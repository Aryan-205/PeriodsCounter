import Calendar from "./component/Calender.jsx"

function App() {

  return (
    <>
      <div className="h-screen w-full flex flex-col gap-8 justify-center items-center bg-black">
        <p className="text-4xl text-blue-500 font-bold font-serif">Period Calculator</p>
        <div className="p-8 border-4 border-blue-500 rounded-2xl">
          <Calendar/>
        </div>
      </div>
    </>
  )
}

export default App
