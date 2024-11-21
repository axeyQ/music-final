const PlayAnimation = () => {
    return ( <div className=" -z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-52 h-52 text-white bg-transparent border-0 rounded-full shadow-none transition-all duration-350 ease-in-out hover:scale-120 focus:scale-120 animate-pulseGlow">
        <svg
          viewBox="0 0 448 512"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-20 h-20 opacity-30"
          fill="currentColor"
        >
          <path
            d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
          ></path>
        </svg>
      </div> );
}
 
export default PlayAnimation;