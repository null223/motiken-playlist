export function Header() {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 h-32 bg-red-500 rounded-b-[100px]" />
      <div className="relative z-10 pt-16 pb-8 text-center">
        <h1 className="text-6xl font-black tracking-wider">
          PLAY:LIST
          <span className="block text-2xl mt-2 text-black">by <span className="text-[#FF931E]">MOTIKEN</span></span>
        </h1>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-red-500 rounded-t-[100px]" />
    </div>
  )
}

