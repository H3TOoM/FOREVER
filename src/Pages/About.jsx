import React from "react";
import { assets } from "../assets/assets";
import Subscribe from '../Components/Subscribe'

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">
            US
          </span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          src={assets.about_img}
          alt="about_img"
          className="w-full md:max-w-[360px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Forever was born out of a passion for innovation and a desire to revolutionize
            the way people shop online. Our journey began with a simple idea:
            to provide a platform where customers can easily discover, explore, and
            purchase a wide range of products from the comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate
            a diverse selection of high-quality products that cater to
            every taste and preference. From fashion and beauty to electronics
            and home essentials, we offer an extensive collection
            sourced from trusted brands and suppliers.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and ordering
            to delivery and beyond.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border border-gray-200 px-10 md:px-15 py-8 sm:py-16 flex flex-col gap-4 text-[15px]">
          <b>Quality Assurance:</b>
          <p>
            We meticulously select and vet each product to ensure it meets our stringent quality standards.
          </p>
        </div>
        <div className="border border-gray-200 px-10 md:px-15 py-8 sm:py-16 flex flex-col gap-4 text-[15px]">
          <b>Convenience:</b>
          <p>
            With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
          </p>
        </div>
        <div className="border border-gray-200 px-10 md:px-15 py-8 sm:py-16 flex flex-col gap-4 text-[15px]">
          <b>Exceptional Customer Service:</b>
          <p>
            Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>
      <Subscribe />
    </div>
  );
};

export default About;