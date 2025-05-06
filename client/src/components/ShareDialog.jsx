import React from 'react'
// component that will be displayed when on products page share btn will be clicked, and onClick of whatsapp redirect to share in whatsapp, on insta same behaviour
function ShareDialog({showShareDialog, setShowshareDialog}) {
    
  return (
    <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 bg-[#ffffffcf] flex justify-center items-center z-50">
  <div className="w-full md:w-[40vw] pb-3 bg-[#f1f9fd] rounded-sm !pt-4 relative flex flex-col items-center gap-6">
    {/* Close Button */}
    <button
      className="absolute right-2 top-1 text-xl font-bold cursor-pointer"
      onClick={() => setShowshareDialog(false)}
    >
      ❌
    </button>

    {/* Share Buttons */}
    <h2 className="text-lg font-semibold">Share This Product</h2>

    <div className="flex gap-6">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold text-lg"
      >
        WhatsApp
      </a>

      {/* Instagram (sharing link) */}
      <a
        href={`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 text-white px-6 py-3 rounded-full font-bold text-lg"
      >
        Instagram
      </a>
    </div>
  </div>
</div>
  )
}

export default ShareDialog