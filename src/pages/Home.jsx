import Navbar from '../components/Navbar'

function Home() {
  return (
    <>
      <Navbar />

      <div className="p-10 text-center">
        <h1 className="text-5xl font-bold text-pink-500">
          🍦 FrostByte Ice Cream
        </h1>

        <p className="mt-4 text-xl">
          La heladería digital más deliciosa del multiverso.
        </p>
      </div>
    </>
  )
}

export default Home
