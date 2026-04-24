import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProtectedLayout from "../components/layout/ProtectedLayout";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import api from "../api/axiosInstance";

const KYC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);

  const captureImage = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setImage(screenshot);
      toast.success("Image captured successfully");
    }
  };
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      mediaRecorderRef.current = new MediaRecorder(stream);
      recordedChunks.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunks.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, {
          type: "video/webm",
        });
        setVideoBlob(blob);
        toast.success("Video recording completed");
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      toast.info("🎥 Recording started with audio...");
    } catch (err) {
      toast.error("Camera/Mic permission denied");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());
  };

  const submitKYC = async () => {
    if (!image) {
      toast.error("Please capture an image before submitting");
      return;
    }
    if (!videoBlob) {
      toast.error("Please record a video before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      const imageBlob = await (await fetch(image)).blob();

      formData.append("image", imageBlob, "image.jpg");
      formData.append("video", videoBlob, "video.webm");

      const res = await api.post("/kyc/upload", formData);

      const data = res.data;

      toast.success(data.message);

      console.log("Image URL:", data.data.imageUrl);
      console.log("Video URL:", data.data.videoUrl);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <ProtectedLayout>
      <div className="max-w-5xl mx-auto">
        <Card title="KYC Verification">
          <div className="rounded-2xl overflow-hidden border border-gray-200">
            <Webcam
              ref={webcamRef}
              className="w-full"
              screenshotFormat="image/jpeg"
              audio={true}
              muted={true}
              videoConstraints={{ facingMode: "user" }}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Capture Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                📸 Capture Selfie
              </h3>

              <Button
                onClick={captureImage}
                disabled={isSubmitting}
                variant="success"
                fullWidth
              >
                Capture Image
              </Button>

              {image && (
                <div className="mt-4">
                  <p className="text-sm text-green-600 mb-2">
                    ✅ Image Captured
                  </p>
                  <img
                    src={image}
                    alt="Captured"
                    className="w-full rounded-xl border border-gray-200"
                  />
                </div>
              )}
            </div>

            {/* Video Recording Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                🎥 Record Video (with Audio)
              </h3>

              {isRecording && (
                <div className="text-center text-red-500 font-semibold animate-pulse">
                  🔴 Recording... Speak clearly
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={startRecording}
                  disabled={isRecording || isSubmitting}
                  variant="danger"
                  fullWidth
                >
                  Start Recording
                </Button>

                <Button
                  onClick={stopRecording}
                  disabled={!isRecording}
                  variant="secondary"
                  fullWidth
                >
                  Stop Recording
                </Button>
              </div>

              {videoBlob && (
                <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-green-700 font-medium">
                    ✅ Video Recorded Successfully
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    Ready for submission
                  </p>
                  <video
                    controls
                    className="w-full rounded-xl mt-3"
                    src={URL.createObjectURL(videoBlob)}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-10">
            <Button
              onClick={submitKYC}
              disabled={user?.kycSubmitted || isSubmitting}
              fullWidth
            >
              {isSubmitting
                ? "Submitting..."
                : user?.kycSubmitted
                  ? "KYC Already Submitted"
                  : "Submit KYC"}
            </Button>
            <p className="text-center text-xs text-gray-500 mt-3">
              Both image and video are required
            </p>
          </div>
        </Card>
      </div>
    </ProtectedLayout>
  );
};

export default KYC;
