"use client";
export const BASE_URL = "https://cyberpro-web-bn.onrender.com";
import {
  countries,
  posts,
} from "@/components/homepage/constant";
import React, { useEffect, useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaLessThan,
  FaTwitter,
} from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { ImQuotesRight } from "react-icons/im";
import { LiaLinkedinIn } from "react-icons/lia";
import { IoStarSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { PiPinterestLogo } from "react-icons/pi";
import Image from "next/image";
import { englishContent, frenchContent } from "@/lib/languageHome";
import { useAppContext } from "@/context/appContext";
import { Blog, Project, Team, Testimony } from "@/types/types";
import axios from "axios";
import { SkeletonBlog, SkeletonPortfolio, SkeletonTeam } from "@/components/skeletons/cardSkeleton";



const Home = () => {
  const { language, theme } = useAppContext();
  const [data, setData] = useState(englishContent);
  const [portfolio, setPortfolio] = useState<Project[]>([]);
  const [testimony, setTestimony] = useState<Testimony[]>([]);
  const [rating, setRating] = useState<{value:number}[]>([]);
  const [blog, setBlog] = useState<Blog[]>([]);
  const [team, setTeam] = useState<Team[]>([]);
  const [isLoadingPortfolio,setIsLoadingPortifolio] =  useState(false)
  const [isLoadingTeam,setIsLoadingTeam] =  useState(false)
  const [isLoadingBlog,setIsLoadingBlog] =  useState(false)
  const [,setIsLoadingtestimony] =  useState(false)
  const [,setIsLoadingRating] =  useState(false)

const  getPercentage = (arr: {value:number}[], target: number): number =>{
  const total = arr.length;
  const count = arr.filter((rate) => rate.value === target).length;

  if (total === 0) return 0; 

  return (count / total) * 100;
}
   const fetchData = async (
     endpoint: string,
     //@ts-expect-error ERROR
     setStateFunc: React.Dispatch<React.SetStateAction<>>,
     setLoadingFunc: React.Dispatch<React.SetStateAction<boolean>>
   ) => {
     try {
       setLoadingFunc(true);
       const response = await axios.get(`${BASE_URL}/${endpoint}`);
       setStateFunc(response.data);
     } catch (error) {
       console.error(`Error fetching ${endpoint}:`, error);
     } finally {
       setLoadingFunc(false);
     }
   };
  const handleRate = async(value:number)=>{
    try {
     await axios.post(`${BASE_URL}/testimony/rate`,{
        value
      })
    fetchData("testimony/rate", setRating, setIsLoadingRating);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    //@ts-expect-error error
    setData(language === "en" ? englishContent : frenchContent);
  }, [language]);

 

useEffect(() => {
  fetchData("project", setPortfolio, setIsLoadingPortifolio);
  fetchData("testimony", setTestimony, setIsLoadingtestimony);
  fetchData("testimony/rate", setRating, setIsLoadingRating);
  fetchData("team", setTeam, setIsLoadingTeam);
  fetchData("blog", setBlog, setIsLoadingBlog);
}, []);

  return (
    <div className={`${theme === "dark" ? "bg-slate-700" : ""}`}>
      <div
        className={`h-fit pb-10 relative -top-36 pt-36 lg:flex  ${
          theme === "dark" ? "text-gray-300" : "text-white"
        }`}
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/5380590/pexels-photo-5380590.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className={`flex flex-col gap-2 lg:gap-5 $`}>
          <p className="text-[#1ABC9C] lg:text-[48px] text-[28px] text-center">
            {data.heroTitle}
          </p>
          <p
            className={`text-[30px] sm:text-[40px] md:text-[50px] lg:text-[30px] xl:text-[64px] lg:leading-30px] text-center px-2`}
          >
            {data.heroSubtitle}
          </p>
          <div className="bg-[#1ABC9C] w-[200px] h-2 mx-auto rounded-lg" />
          <button
            className={`button hover:bg-teal-500 hover:rounded-lg text-[16px]  w-fit mx-auto px-4 py-2`}
          >
            {data.readMore}
          </button>
        </div>
      </div>
      <div className="font-roboto min-h-screen w-full">
        <div
          className={`flex justify-between items-center h-full Z
          }`}
        >
          <div
            className={`flex flex-col justify-center items-center text-center md:text-left m-auto `}
          >
            <h1
              className={`font-[800] text-teal-500 text-[24px] sm:text-[28px] md:text-[36px]`}
            >
              {data.featureTitle}
            </h1>
            <p
              className={`
               ${theme === "dark" ? "text-gray-300" : "text-black"}
              font-[800] text-[32px] sm:text-[36px] md:text-[48px]`}
            >
              {data.featureSubtitle}
            </p>
            <div className="w-[150px] sm:w-[200px] md:w-[242px] h-[6px] sm:h-[7px] md:h-[9px] bg-custom-blue mt-4" />
          </div>
        </div>
        {/* cards */}
        <div className="flex items-start justify-center w-full gap-10 mt-10 card-holder">
          {posts.map((post, index) => (
            <div
              key={index}
              className={`relative card border border-gray-400 w-60 rounded-lg shadow-md max-w-full box-border mb-3 h-[25rem] transform transition duration-300 hover:scale-105 ${
                theme === "dark" ? "bg-gray-800" : "bg"
              }`}
            >
              <div className="flex flex-col gap-2 text-center">
                <Image
                  src="https://images.pexels.com/photos/5380590/pexels-photo-5380590.jpeg"
                  alt="cyber"
                  width={90}
                  height={90}
                  className="w-full h-48 object-cover"
                />
                <h2 className="font-bold text-2xl">{post.title}</h2>
                <p
                  className={` ${
                    theme === "dark" ? "text-gray-300 " : "text-white"
                  } text-sm p-2`}
                >
                  {post.content}
                </p>
              </div>
              <div className="absolute bottom-2 flex w-full items-center justify-center">
                <button className="bg-teal-500 hover:bg-[#1B396E] rounded-full py-2 px-3 w-fit text-[7px] text-white hover:rounded-lg">
                  {data.readMore}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full items-center justify-center mt-5">
          <button className="bg-[#1B396E] hover:bg-teal-500 py-2 px-3 w-fit text-[17px] text-white ">
            {data.visitServicePage}
          </button>
        </div>
        {/* about us */}
        <div className="flex flex-col md:flex-row justify-center items-center p-4">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-[#1B396E] text-[24px] md:text-[36px]">
              {data.aboutUsTitle}
            </h1>
            <p className="font-[800] text-[16px] md:text-[18px]">
              {data.aboutUsSubtitle}
            </p>
            <div className="w-[30px] md:w-[50px] h-[5px] md:h-[7px] bg-[#1B396E] my-2"></div>
            <p
              className={`${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              } w-full md:w-[691px] h-auto font-[300] text-sm`}
            >
              {data.aboutUsDescription}
            </p>
            <div className="flex w-full justify-center md:justify-start mt-5">
              <button className="bg-[#1B396E] hover:bg-teal-500 py-2 px-3 w-fit text-[15px] md:text-[17px] text-white hover:rounded-lg">
                {data.readMore}
              </button>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:ml-8">
            <Image
              src="https://images.pexels.com/photos/5240548/pexels-photo-5240548.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="CyberPro"
              width={90}
              height={90}
              className="w-[300px] md:w-[400px] h-[300px] md:h-[400px] object-cover"
            />
          </div>
        </div>

        {/* PORTFOLIO */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2
              className={` text-2xl text-teal-500 lg:text-4xl font-bold mb-2`}
            >
              Portfolio
            </h2>
            <p
              className={` ${
                theme === "dark" ? "text-gray-300" : "text-black"
              } text-3xl lg:text-5xl font-bold mb-4`}
            >
              View Our Case Studies
            </p>
            <div
              className={`w-[150px] h-2 mx-auto rounded-lg`}
            />
          </div>

          {isLoadingPortfolio ? (
            <SkeletonPortfolio />
          ) : (
            <div className="flex flex-wrap justify-center items-center gap-6">
              {portfolio.slice(-3).map((project, index) => (
                <div
                  key={index}
                  className={`w-full md:w-72 rounded-lg shadow-lg p-4 transition-transform hover:scale-105`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="mb-4">{project.content}</p>
                  <button
                    className={`${
                      theme === "dark" ? "bg-blue-900" : "bg-blue-700"
                    } mx-auto text-white px-4 py-2 rounded-full text-sm`}
                  >
                    {data.readMore}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <div
          className=" bg-cover bg-center w-full  h-fit lg:h-[730px] "
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/8134239/pexels-photo-8134239.jpeg?auto=compress&cs=tinysrgb&w=600')`,
          }}
        >
          <div className="flex flex-col justify-center items-center text-center md:text-left m-auto">
            <h1 className="font-[800] text-teal-500 text-[24px] sm:text-[28px] md:text-[36px]">
              {data.financeTitle}
            </h1>
            <p
              className={`font-[800] ${
                theme === "dark" ? "text-gray-300" : "text-black"
              } text-[32px] sm:text-[36px] md:text-[28px] text-white`}
            >
              {data.financeSubtitle}
            </p>
            <div className="w-[80px] h-[6px] sm:h-[7px] md:h-[9px] bg-custom-blue mt-4" />
          </div>
          <div
            className={`${
              theme === "dark"
                ? "bg-gray-900 text-gray-100"
                : "text-gray-900 bg-white"
            }  flex flex-col sm:flex-row justify-center items-center gap-10 w-full p-6 sm:p-10 mb-10 mt-6`}
          >
            <p className="text-center sm:text-left ">
              Professional Training <br />
              (CyberPro Academy)
            </p>
            <div className="flex flex-col sm:flex-row">
              <div className="flex flex-col lg:mx-10">
                <p className="flex items-center">
                  <TiTick size={20} />
                  {data.professionalCourse}
                </p>
                <p className="flex items-center">
                  <TiTick size={20} />
                  {data.professionalCertification}
                </p>
              </div>
              <div className="flex flex-col sm:ml-6">
                <p className="flex items-center">
                  <TiTick size={20} />
                  {data.freeResource}
                </p>
                <p className="flex items-center">
                  <TiTick size={20} />
                  {data.seminarsConferences}
                </p>
              </div>
            </div>
            <button className="bg-[#1B396E] hover:bg-teal-500 py-2 px-3 w-[208px]   text-[15px] sm:text-[17px] text-white">
              {data.enrollNow}
            </button>
          </div>
          <div
            className={`${
              theme === "dark"
                ? "bg-gray-900 text-gray-100"
                : "text-gray-900 bg-white"
            }  flex flex-col sm:flex-row justify-center items-center gap-10 w-full p-6 sm:p-10 mb-10 mt-6`}
          >
            <p className="text-center sm:text-left">
              {data.consultingServices}
            </p>
            <div className="flex flex-col sm:flex-row">
              <div className="flex flex-col">
                <p className="flex items-center">
                  <TiTick size={20} />
                  {data.cyberSecurityAssessments}
                </p>
                <p className="flex items-center">{data.itSecurityAudit}</p>
              </div>
              <div className="flex flex-col sm:ml-6">
                <p className="flex items-center">
                  <TiTick size={20} />
                  {data.threatIntelligence}
                </p>
                <p className="flex items-center">
                  <TiTick size={20} />
                  {data.thirdPartyRiskAssessment}
                </p>
              </div>
            </div>
            <button className="bg-[#1B396E] hover:bg-teal-500 py-2 px-3 w-[208px] text-[15px] sm:text-[17px] text-white">
              {data.getExpertAdvice}
            </button>
          </div>
          <div
            className={`${
              theme === "dark"
                ? "bg-gray-900 text-gray-100"
                : "text-gray-900 bg-white"
            }  flex flex-col sm:flex-row justify-center items-center gap-10 w-full p-6 sm:p-10 mb-10 mt-6`}
          >
            <p className="text-center sm:text-left">
              {data.cctvCameraSecurity}
            </p>
            <div className="flex flex-col sm:flex-row">
              <div className="flex flex-col">
                <p className="flex items-center">
                  <TiTick size={20} />
                  {data.consultationAndAssessment}
                </p>
                <p className="flex items-center">
                  <TiTick size={20} />
                  {data.professionalInstallation}
                </p>
                <p className="flex items-center">
                  <TiTick size={20} />
                  {data.upgradeAndExplanation}
                </p>
              </div>
              <div className="flex flex-col sm:ml-6">
                <p className="flex items-center">
                  <TiTick size={20} />
                  {data.systemConfiguration}
                </p>
                <p className="flex items-center">
                  <TiTick size={20} />
                  {data.maintenanceAndSupport}
                </p>
                <p className="flex items-center">
                  <TiTick size={20} />
                  {data.trainingInternship}
                </p>
              </div>
            </div>
            <button className="bg-[#1B396E] hover:bg-teal-500 py-2 px-3 w-[208px] text-[15px] sm:text-[17px] text-white">
              {data.viewMore}
            </button>
          </div>
        </div>
        {/* tesimonies */}
        <h1 className="my-10 flex justify-center text-center font-[800] text-[36px] text-[#1ABC9C]">
          {data.testimonialTitle}
        </h1>
        {testimony && testimony.length > 0 ? (
          <div className="relative flex flex-col lg:flex-row">
            <Image
              src={testimony[0].image}
              alt={`testimony for ${testimony[0].authorRole}`}
              width={90}
              height={90}
              className="lg:relative lg:left-[600px] lg:w-[620px] md:max-w-xl max-w-full mx-6 lg:mx-0 h-[395px] object-cover"
            />

            <div className="lg:absolute lg:-left-[10px] lg:top-[0px] flex flex-col bg-[#D9D9D9] max-w-full md:max-w-xl p-3 mx-6 mb-6">
              <ImQuotesRight className="w-[50px] h-[50px] md:w-[81px] md:h-[81px] text-sky-400" />

              <p className="font-[400] text-base md:text-lg mt-5 md:mt-10">
                {testimony[0].authorRole}
              </p>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mt-10 md:mt-20">
                <div>
                  <h1 className="font-[800] text-[24px] md:text-[36px] text-[#1B396E]">
                    {testimony[0].authorName}
                  </h1>
                  <h2 className="font-[300] text-[16px] md:text-[20px] text-[#1B396E]">
                    {`${testimony[0].authorRole} - ${testimony[0].authorCompany}`}
                  </h2>
                </div>

                <div className="flex gap-4 md:gap-10 mt-5 md:mt-8">
                  <FaLessThan
                    size={20}
                    className="bg-white rounded-3xl font-extrabold"
                  />
                  <FaGreaterThan size={20} className="bg-white rounded-3xl" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          "no testimony available"
        )}

        {/* custom rating and review */}

        <p className="w-full max-w-[625px] h-auto font-[800] text-[28px] sm:text-[36px] text-[#1ABC9C] text-center m-auto mt-10">
          customer reviews and rating
        </p>

        <div className="flex flex-col lg:flex-row gap-3 mt-10">
          <div className="bg-[#D9D9D9] max-w-[500px] w-full h-auto sm:h-[400px] p-4 sm:p-8 mx-auto flex flex-col items-center">
            <h1 className="w-full text-center font-[800] text-[36px] sm:text-[28px] text-[#1B396E]">
              {data.customerReviews}
            </h1>

            <div className="w-full  pb-[5px] py-[3px] mb-6 gap-[10px] flex justify-center bg-[#F3F4FF] rounded-full">
              <div className="flex items-center gap-2">
                <IoStarSharp className="w-[20px] h-[20px] text-yellow-300" />
                <IoStarSharp className="w-[20px] h-[20px] text-yellow-300" />
                <IoStarSharp className="w-[20px] h-[20px] text-yellow-300" />
                <IoStarSharp className="w-[20px] h-[20px] text-yellow-300" />
                <IoStarSharp className="w-[20px] h-[20px] text-yellow-300" />
                <p className="font-bold text-[18px]">{data.heroSubtitle}</p>
              </div>
            </div>

            <p className="text-sm mb-6">{`${rating.length} CUSTOMER Ratings`}</p>

            <div className="w-full max-w-[454px] bg-white p-4 space-y-2">
              {/** Rating Bar Rows */}
              {[
                {
                  label: "5 stars",
                  percentage: getPercentage(rating, 5).toFixed() + "%",
                },
                {
                  label: "4 stars",
                  percentage: getPercentage(rating, 4).toFixed() + "%",
                },
                {
                  label: "3 stars",
                  percentage: getPercentage(rating, 3).toFixed() + "%",
                },
                {
                  label: "2 stars",
                  percentage: getPercentage(rating, 2).toFixed() + "%",
                },
                {
                  label: "1 star",
                  percentage: getPercentage(rating, 1).toFixed() + "%",
                },
              ].map((rating, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="w-[60px] text-nowrap">{rating.label}</p>
                  <div className="w-full h-3 bg-slate-300 mx-2">
                    <div
                      className="bg-yellow-300 h-3"
                      style={{ width: rating.percentage }}
                    ></div>
                  </div>
                  <p>{rating.percentage}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#D9D9D9] w-full max-w-[500px] h-auto sm:h-[400px] p-4 sm:p-8 mx-auto flex flex-col items-center">
            <h1 className="font-[800] text-[#1B396E] text-[36px] sm:text-[28px] text-center mb-4">
              {data.rateUs}
            </h1>
            <p className="font-[300] text-[14px] text-center text-[#2D2A2A] mb-6">
              {data.rateUsSubtitle}
            </p>

            <div className="w-full max-w-[487px] py-[10px] mb-6 gap-[21px] flex justify-center bg-[#F3F4FF]">
              <IoStarSharp
                onClick={() => handleRate(1)}
                className="w-[40px] sm:w-[54px] h-[40px] sm:h-[54px] text-yellow-300"
              />
              <IoStarSharp
                onClick={() => handleRate(2)}
                className="w-[40px] sm:w-[54px] h-[40px] sm:h-[54px] text-yellow-300"
              />
              <IoStarSharp
                onClick={() => handleRate(3)}
                className="w-[40px] sm:w-[54px] h-[40px] sm:h-[54px] text-yellow-300"
              />
              <IoStarSharp
                onClick={() => handleRate(4)}
                className="w-[40px] sm:w-[54px] h-[40px] sm:h-[54px] text-gray-300"
              />
              <IoStarSharp
                onClick={() => handleRate(5)}
                className="w-[40px] sm:w-[54px] h-[40px] sm:h-[54px] text-gray-300"
              />
            </div>
          </div>
        </div>

        {/* our staff  */}
        <div className="flex flex-col  justify-center items-center text-center md:text-left m-auto mt-11">
          <h1 className="font-[800] text-teal-500 text-[24px] sm:text-[28px] md:text-[36px]">
            {data.ourStaffTitle}
          </h1>
          <p className={`${theme==='dark'?"text-gray-300":'text-black'} font-[800] text-[32px] sm:text-[36px] md:text-[48px] mb-5`}>
            {data.ourStaffSubtitle}
          </p>
        </div>
        <>
        {isLoadingTeam?SkeletonTeam:
        <div className="flex card-holder  justify-center items-center gap-6 w-full md:w-[600px] lg:w-[1000px] m-auto">
          {team && team.length > 0
            ? team.map((member, index) => (
                <div
                  key={index}
                  className="bg-[#D9D9D9] min-w-fit h-fit pb-5 transform transition duration-300 hover:scale-105"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    width={90}
                    height={90}
                    className="w-full h-32 object-cover"
                  />
                  <h2 className="font-bold text-[24px] text-[#1B396E]  text-center">
                    {member.role}
                  </h2>
                  <p className="text-[28px] p-2 text-[#49454F] text-center">
                    {member.name}
                  </p>
                  <div className="flex items-center justify-center gap-[2px]">
                    <a href={member.linkedInProfile || "###"}>
                      <LiaLinkedinIn className="w-3 h-3" />
                    </a>
                    <a href={member.instagramProfile || "###"}>
                      <FaInstagram className="w-3 h-3 " />
                    </a>
                    <a href={member.twiterProfile || "###"}>
                      <FaTwitter className="w-3 h-3" />
                    </a>
                    {/* <link href={member.f}>
                <FaFacebook className="w-3 h-3 " />
                </link> */}
                  </div>
                </div>
              ))
            : "no team info available "}
        </div>}
        </>
        {/* contact page */}

        <div
          className="w-full h-auto mt-16 bg-cover bg-center "
          style={{
            backgroundImage: `url('https://media.istockphoto.com/id/1292545007/photo/female-hands-using-smartphone-while-sitting-in-home-office-room.jpg?s=612x612&w=0&k=20&c=x9Umo0bYowtiWt849JWZ3XZK-IgxbbsHUBU8k9siinE=')`,
          }}
        >
          <h1 className="w-[265px] h-[60.57px] font-[800] text-[24px] sm:text-[36px] text-[#1ABC9C] text-center m-auto">
            {data.contactTitle}
          </h1>
          <div className="flex flex-col lg:flex-row md:flex-row lg:gap-56 gap-10">
            <div
              className="w-full max-w-[500px] lg:max-w-[300px] md:max-h-[600px] h-fit sm:h-[500px] p-6 sm:p-10 lg:m-6  "
              style={{
                background:
                  "linear-gradient(263.62deg, rgba(106, 151, 230, 0.94) 1.63%, rgba(27, 57, 110, 0.7238) 65.78%)",
              }}
            >
              <h1 className="w-full text-center font-[800] text-[20px] sm:text-[24px] text-[#1ABC9C] mb-4">
                {data.letsStart}
              </h1>
              <p className="w-full text-center font-[800] text-[18px] sm:text-[20px] text-[#1B396E] mb-6">
                {data.secureYourFuture}
              </p>
              <div className="w-[64px] h-[8px] bg-[#1B396E] mt-3 mx-auto mb-6" />
              <p className="w-full max-w-[555px] text-center font-[400] text-[14px] sm:text-[16px] mb-8">
                Explore our portfolio of innovative solutions, detailing the
                challenges we&apos;ve solved and the successes we&apos;ve
                delivered for businesses across diverse industries.
              </p>
              <div className="flex flex-row items-center justify-center space-x-4">
                <button className="bg-[#1ABC9C] py-2 px-4 text-[16px] sm:text-[17px] text-white">
                  {data.contactUs}
                </button>
                <FaGreaterThan
                  size={20}
                  className="bg-white p-1 rounded-full"
                />
              </div>
            </div>

            <div className="flex flex-col">
              {countries.map((country, index) => (
                <div className="flex flex-col justify-center" key={index}>
                  <h1 className="w-[77.38px] h-[39.31px] font-[800] text-[14px] text-[#1B396E] text-right lg:mx-52">
                    {country}
                  </h1>
                  <div className="flex flex-row gap-6 lg:gap-40">
                    <FaLocationDot className="w-[40px] h-[40px] text-red-500" />
                    <div className="flex flex-col">
                      <p className="w-auto h-auto font-[700] text-[16px]">
                        KIGALI, RWANDA
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-6 lg:gap-40">
                    <IoCall className="w-[40px] h-[40px] text-[#1B396E]" />
                    <p className="w-auto h-auto font-[700] text-[15px]">
                      +250-733-770-003 <br /> +250-788-674-885
                    </p>
                  </div>
                  <div className="flex flex-row gap-6 lg:gap-40">
                    <MdOutlineMailOutline className="w-[40px] h-[40px] text-red-500" />
                    <p className="w-auto h-auto font-[700] text-[16px]">
                      info@cyberprogroup.com
                    </p>
                  </div>
                </div>
              ))}

              <div className="w-full max-w-[400px] py-[2px] mb-6 mt-10 gap-[21px] flex flex-col text-center justify-center bg-[#1B396E]">
                <p className="w-auto h-auto font-[700] text-[20px] text-[#D9D9D9]">
                  {data.followUs}
                </p>
                <div className="flex flex-row justify-center space-x-4">
                  <PiPinterestLogo className="w-[20px] lg:w-[30px] h-[20px] lg:h-[30px]" />
                  <FaGithub className="w-[20px] lg:w-[30px] h-[20px] lg:h-[30px]" />
                  <LiaLinkedinIn className="w-[20px] lg:w-[30px] h-[20px] lg:h-[30px]" />
                  <FaInstagram className="w-[20px] lg:w-[30px] h-[20px] lg:h-[30px]" />
                  <FaTwitter className="w-[20px] lg:w-[30px] h-[20px] lg:h-[30px]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* our blog */}

        <div className="flex flex-col justify-center items-center text-center md:text-left m-auto">
          <h1 className="font-[800] text-teal-500 text-[24px] sm:text-[28px] md:text-[36px] mt-10">
            {data.whatsNew}
          </h1>
          <p className="font-[800] text-[32px] sm:text-[36px] md:text-[48px]">
            {data.latestBlog}
          </p>
        </div>
        <>
        {isLoadingBlog ? (
          SkeletonBlog
        ) : (
          <div className="flex items-start justify-center w-full gap-10 mt-10 card-holder">
            {blog.slice(-3).map((blogItem, index) => (
              <div
                key={index}
                className={`relative card border w-60 rounded-lg shadow-md max-w-full box-border mb-3 h-[500px] transform transition duration-300 hover:scale-105`}
              >
                <div className="flex flex-col gap-2 text-center">
                  <Image
                    src={blogItem.image}
                    alt="cyber"
                    width={90}
                    height={90}
                    className="w-full h-48 object-cover"
                  />
                  <h2 className="font-bold text-2xl">{blogItem.title}</h2>
                  <p className="text-sm text-gray-600 p-2">
                    {blogItem.content}
                  </p>
                </div>
                <div className="absolute bottom-2 flex w-full items-center justify-center">
                  <button className="bg-teal-500 hover:bg-[#1B396E] rounded-full py-2 px-3 w-fit text-[7px] text-white">
                    {data.readMore}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        </>
        <div className="flex w-full items-center justify-center mt-5">
          <button className="bg-[#1B396E] hover:bg-teal-500 py-2 px-3 w-fit text-[17px] text-white">
            {data.viewMore}
          </button>
        </div>

        {/* map */}
        <div className="mx-10 ">
          <iframe
            className="w-full m-auto"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.775313606574!2d-122.03224420000001!3d37.2767548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e4ad38fa6a251%3A0x4462135701bcadcb!2sSaratoga%20Sunnyvale%20Rd%2C%20Saratoga%2C%20CA%2095070%2C%20USA!5e0!3m2!1sen!2srw!4v1726610527050!5m2!1sen!2srw"
            width="800"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Home;
