import OIP from '/public/OIP.jpg';

export default function About(){
 return (
    <div className="pt-20 mt-10 px-10 bg-sky-900 justify-center max-w-screen h-screen ">
        <p className="font-bold text-2xl mb-6 text-yellow-400 uppercase text-center items-middle">About Us</p>
        <div className="grid grid-cols-1 md:grid-cols-2 mb-6">
            <div>
                <p className="text-lg my-4 w-60 md:w-[90vh] justify-center text-center text-white font-semibold">
                    Welcome to MeetMyJourney, your go-to platform for career growth and development. 
                    We are dedicated to providing valuable resources and support to help individuals 
                    navigate their professional journey and achieve success.
                </p>
                <p className="text-lg my-4 w-60 md:w-[90vh] justify-center text-center text-white font-semibold">
                    Our mission is to empower individuals to reach their full potential 
                    by offering comprehensive tools, guidance, and opportunities for career advancement.
                    We envision a world where everyone has access to the resources and support they need 
                to thrive in their careers and achieve their professional goals.
                </p>
            </div>
            <img src={OIP} alt="image" className="rounded-xl  max-h-80 max-w-110"/>
        </div>
           
        {/*<div>*/}
        {/*    <h2 className="capitalize text-2xl text-yellow-400 text-center font-bold">Our Team</h2>*/}
        {/*    <div>*/}
        {/*        */}
        {/*    </div>*/}
        {/*</div>*/}
            
    </div>
    );
}