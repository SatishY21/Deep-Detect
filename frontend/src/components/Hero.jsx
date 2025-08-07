 
import DeepFakeImg from "../img/img.jpeg"
import { Link,useState } from "react"
import {useNavigate } from "react-router-dom"
import { Upload, Check, AlertCircle } from "lucide-react"

const Hero = ({ openAuthModal }) => {
  const navigate=useNavigate()
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      handleImageUpload(files[0])
    }
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file)
    }
  }

  const handleImageUpload = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target.result)
      setAnalysisResult(null)
    }
    reader.readAsDataURL(file)
  }

  const analyzeImage = () => {
    if (!uploadedImage) return

    setIsAnalyzing(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Random result for demo purposes
      const isFake = Math.random() > 0.5
      const confidence = (Math.random() * 30 + 70).toFixed(2)

      setAnalysisResult({
        isFake,
        confidence: Number.parseFloat(confidence),
        details: isFake
          ? "This image appears to be AI-generated or manipulated."
          : "This image appears to be authentic.",
      })

      setIsAnalyzing(false)
    }, 2000)
  }

  const resetAnalysis = () => {
    setUploadedImage(null)
    setAnalysisResult(null)
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Column - Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Detect Deepfakes Instantly with AI 🔍
            </h1>
            <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">
              Upload an image and let our AI tell you if it's real or fake. Protect yourself from misinformation with
              cutting-edge deepfake detection.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate("/Predict-Image")}
                className="px-12 py-6 bg-blue-600 text-4xl hover:bg-blue-700 text-white rounded-lg text-lg font-medium transition-all transform hover:scale-105"
              >
                Try for Free
              </button>
              <button
                onClick={() => navigate("/pricing")}
                className="px-12 py-6 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg text-lg font-medium transition-all"
              >
                Upgrade
              </button>
              {/* <a
                href="/pricing"
                className="px-12 py-6 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg text-lg font-medium transition-all"
              >
                Upgrade
              </a> */}
            </div>
          </div>

          {/* Right Column - Upload Box */}
          {/* <div className="lg:w-1/2 w-full max-w-md mx-auto">
            {!uploadedImage ? (
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  isDragging
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Upload size={28} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Upload an Image</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Drag and drop an image here, or click to browse
                  </p>
                  <input type="file" id="image-upload" accept="image/*" className="hidden" onChange={handleFileInput} />
                  <label
                    htmlFor="image-upload"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
                  >
                    Upload Image
                  </label>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img src={uploadedImage || "/placeholder.svg"} alt="Uploaded" className="w-full h-64 object-cover" />
                  {analysisResult && (
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-medium ${
                        analysisResult.isFake ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {analysisResult.isFake ? "Likely Fake" : "Likely Real"}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {analysisResult ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        {analysisResult.isFake ? (
                          <AlertCircle className="text-red-500" size={24} />
                        ) : (
                          <Check className="text-green-500" size={24} />
                        )}
                        <h3 className="text-xl font-semibold">{analysisResult.details}</h3>
                      </div>

                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700 dark:text-gray-300">Confidence</span>
                          <span className="font-medium">{analysisResult.confidence}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${analysisResult.isFake ? "bg-red-500" : "bg-green-500"}`}
                            style={{ width: `${analysisResult.confidence}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={resetAnalysis}
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                        >
                          Try Another
                        </button>
                        <button
                          onClick={() => openAuthModal("signup")}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                        >
                          Sign Up for More
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Ready to Analyze</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Click the button below to analyze this image for deepfake detection.
                      </p>
                      <div className="flex gap-4">
                        <button
                          onClick={resetAnalysis}
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={analyzeImage}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                          disabled={isAnalyzing}
                        >
                          {isAnalyzing ? (
                            <span className="flex items-center justify-center">
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Analyzing...
                            </span>
                          ) : (
                            "Analyze Image"
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div> */}
          {
            <div className="lg:w-1/2 w-full max-w-md mx-auto">
            <img 
              src={DeepFakeImg} 
              alt="Deepfake Analysis" 
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
          
          }
        </div>
      </div>
    </section>
  )
}

export default Hero

