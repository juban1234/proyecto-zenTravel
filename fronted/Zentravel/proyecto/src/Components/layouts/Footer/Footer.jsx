import { ItemNav } from "../../UI/ItemNav/ItemNav"
import { FaFacebook,FaGithub } from "react-icons/fa";


export const Footer = () => {
    return (
        <>
            <footer className="bg-blue-950  w-full h-25 flex flex-row flex-wrap justify-around items-center relative bottom-0 left-0">
                <p className="text-amber-50">
                    Desarrollado por: Juan esteban grajales
                </p>
                <div className="flex flex-row text-3xl">
                <ItemNav
                    StyleLi={"list-none pl-2 fas fa-heart text-cyan-500"}
                    content={<FaGithub />}
                    route={"https://github.com/juban1234/Portafolio-Profecional.git"}
                />
                
                <ItemNav
                    StyleLi={" list-none pl-2 fas fa-heart text-cyan-500"}
                    content={<FaFacebook />}
                    route={"https://www.facebook.com/"}
                />
                
                </div>

                
            </footer>
        </>
    )
}
