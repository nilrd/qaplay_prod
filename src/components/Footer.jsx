import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Heart, MessageCircle, Instagram, Phone } from 'lucide-react'
import AdBannerFooter from './ads/AdBannerFooter'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <AdBannerFooter />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre o Projeto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">QAPlay</h3>
            <p className="text-sm text-muted-foreground">
              Uma plataforma de desafios para profissionais de QA, desenvolvida como um projeto de portfólio para demonstrar habilidades práticas em automação e qualidade de software.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/jogos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Jogos
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/curriculo" className="text-muted-foreground hover:text-foreground transition-colors">
                  Currículo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Redes Sociais</h3>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://www.linkedin.com/in/nilsondasilvabrites/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="https://github.com/nilrd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="https://wa.me/5511940825120"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">WhatsApp</span>
              </a>
              <a
                href="https://instagram.com/nilsbrites"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span className="text-sm">Instagram</span>
              </a>
              <a
                href="mailto:nilson.brites@gmail.com"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors col-span-2"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">nilson.brites@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Sobre o Autor */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Nilson Brites</h3>
            <p className="text-sm text-muted-foreground">
              Quality Assurance Engineer que acredita no poder da colaboração para aprender e evoluir o conhecimento em QA.
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} QAPlay. <Heart className="h-4 w-4 inline text-red-500" /> Uma iniciativa de Nilson Brites para a comunidade de QA.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

