import React from 'react'

export const Home = () => {

    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
      axios
        .get("http://localhost:10101/api")
        .then((response) => {
          // Accede a response.data.message en lugar de usar response.data directamente
          setMensaje(response.data.message);
        })
        .catch((error) => {
          console.error("Error al obtener datos:", error);
        });
    }, []);

  return (
    <>
    
    </>
  )
}
