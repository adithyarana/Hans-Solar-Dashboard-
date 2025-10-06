import React from 'react'


const ALLHumData = ({loading, humdata}) => {

  function formatrole(role){
    if(role === "HANSURJAMITRA"){
      return "Hans Urja Mitra"
    }
  }

  if(!humdata || humdata.length === 0){
    return(
      <div className="flex justify-center items-center h-40">
        <div className='text-gray-500 text-2xl font-semibold'>No Hum Data. Please Add !</div>
      </div>
    )
  }


  return (
    <div className="px-5 py-5 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600"></div>
        </div>
      ) : (
        <div className="flex flex-col bg-white rounded-xl shadow overflow-hidden divide-y divide-gray-200">
          <div className="grid grid-cols-5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-semibold text-md p-3 ">
            <div>Hum ID</div>
            <div>Name</div>
            <div>Email</div>
            <div>Start Date</div>
            <div>Role</div>
          </div>

          {humdata?.map((hum) => (
            <div
              key={hum.id}
              className="grid grid-cols-5 p-4 text-md hover:bg-orange-100 transition cursor-pointer duration-200"
              onClick={() => window.open(`/dashboard/hum/${hum.id}`,'_blank')}
            >
              <div className="font-medium text-gray-800">{hum.hansurjaId}</div>
              <div className="text-gray-700">{hum.name || "N/A"}</div>
              <div className="text-gray-600">{hum.email || "N/A"}</div>
              <div className="text-gray-600">{hum.startDate ? new Date(hum.startDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
               
              }) : "N/A"}</div>
              <div className="text-orange-700 font-semibold">{formatrole(hum.role) || "N/A"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ALLHumData