import { Link } from "react-router-dom"
import SiteHeader from "../components/SiteHeader"
import SiteFooter from "../components/SiteFooter"

function Home() {
  return (
    <div className="page-landing">
      <SiteHeader
        links={[
          { to: "#inicio", label: "Inicio", external: true },
          { to: "#planes", label: "Planes", external: true },
          { to: "#reservas", label: "Reservas", external: true },
        ]}
      />

      <main>
        <section className="hero" id="inicio">
          <div className="hero-content">
            <h1>Bienvenido a Club Deportivo Pro</h1>
            <p>Tu espacio para entrenar, crecer y alcanzar tus metas deportivas</p>
            <div className="hero-buttons">
              <Link to="/login" className="btn btn-primary">
                Iniciar Sesión
              </Link>
              <Link to="/registro" className="btn btn-secondary">
                Registrarse
              </Link>
            </div>
          </div>
        </section>

        <section className="about">
          <div className="about-container">
            <h2>SportClub – Tu mejor versión comienza hoy</h2>

            <div className="about-content">
              <div className="about-card">
                <p>
                  En SportClub creemos que el deporte no solo transforma el cuerpo, sino también la mente y el estilo de vida. Nuestro objetivo es acompañar a cada persona en su proceso, sin importar su nivel o experiencia.
                </p>
              </div>

              <div className="about-card">
                <p>
                  Somos una comunidad enfocada en el bienestar, el compromiso y la superación personal. Contamos con entrenadores especializados, programas personalizados y un ambiente que motiva a dar lo mejor en cada entrenamiento.
                </p>
              </div>

              <div className="about-card highlight">
                <p>
                  <strong>En SportClub no solo vienes a entrenar…</strong>
                  <br />
                  vienes a crecer, a superarte y a construir tu mejor versión.
                </p>
              </div>
            </div>

            <div className="vision-section">
              <h3>Nuestra Visión</h3>
              <p>
                Queremos ser el club deportivo referente en la formación integral de personas, combinando tecnología, entrenamiento y comunidad para mejorar la calidad de vida de nuestros usuarios.
              </p>
            </div>
          </div>
        </section>

        <section className="features" id="planes">
          <h2>Nuestros Servicios</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Entrenamientos Personalizados</h3>
              <p>Accede a entrenamientos diseñados especialmente para ti por nuestros profesionales certificados.</p>
            </div>
            <div className="feature-card">
              <h3>Reserva de Espacios</h3>
              <p>Reserva tus horarios favoritos en nuestras instalaciones de forma rápida y sencilla.</p>
            </div>
            <div className="feature-card">
              <h3>Seguimiento de Progreso</h3>
              <p>Monitorea tu evolución con nuestro sistema avanzado de tracking fitness.</p>
            </div>
            <div className="feature-card">
              <h3>Comunidad Activa</h3>
              <p>Conecta con otros miembros, comparte logros y motívate juntos.</p>
            </div>
          </div>
        </section>

        <section className="cta" id="reservas">
          <h2>¿Listo para comenzar tu camino hacia el éxito?</h2>
          <p>Únete a cientos de miembros que ya están transformando sus vidas</p>
          <Link to="/registro" className="btn btn-large">
            Crear Mi Cuenta Ahora
          </Link>
        </section>
      </main>

      <SiteFooter text="© 2026 Club Deportivo Pro - Todos los derechos reservados" />
    </div>
  )
}

export default Home
