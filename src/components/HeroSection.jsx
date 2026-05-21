// components/HeroSection.jsx
import Button from "./Button";

export default function HeroSection({
  title,
  subtitle,
  image,
  buttonText = "Mulai Sekarang",
  onButtonClick,
}) {
  return (
    <div className="bg-gradient-to-r from-apotek-hijau to-apotek-biru py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
            {subtitle}
          </p>
          <Button 
            type="danger" 
            onClick={onButtonClick}
            className="shadow-lg hover:shadow-xl transition-shadow"
          >
            {buttonText}
          </Button>
        </div>
        {image && (
          <div className="md:w-1/2 flex justify-center">
            <img 
              src={image} 
              alt="Hero" 
              className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}