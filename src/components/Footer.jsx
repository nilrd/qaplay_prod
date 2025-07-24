import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
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
              Plataforma gamificada para aprendizado de Quality Assurance. 
              Aprenda QA de forma divertida e interativa.
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
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/nilrd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/nilsondasilvabrites/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:nilson.brites@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Sobre o Autor */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Nilson Brites</h3>
            <p className="text-sm text-muted-foreground">
              Quality Assurance Engineer apaixonado por ensinar e compartilhar conhecimento.
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} QAPlay. Criado com <Heart className="h-4 w-4 inline text-red-500" /> por Nilson da Silva Brites.
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

