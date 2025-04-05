import { useState } from "react";
import { ItemNav } from "../../UI/ItemNav";




export const Home = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggMenu = () => {
    setIsOpen(!isOpen);
  };

  return (

    <main className="min-h-screen">
      <h1>editar perfil</h1>
        <button>
          <ItemNav to={'/perfil'} content='editar perfil' />
        </button>

        </main>
      )
      }
