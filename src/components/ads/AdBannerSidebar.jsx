// Componente de anúncio lateral
// Posicionamento estratégico na lateral direita do conteúdo
// Baseado nas melhores práticas do Google AdSense

const AdBannerSidebar = () => {
  // Configuração para mostrar/ocultar anúncios
  const showAds = false // Alterar para true quando o AdSense estiver configurado
  
  if (!showAds) {
    return null // Componente invisível - não ocupa espaço na tela
  }

  return (
    <div className="hidden lg:block sticky top-4">
      <div className="w-full max-w-[300px]">
        {/* 
          Posicionamento: Lateral direita (Sidebar)
          Tamanho recomendado: 300x250 (Medium Rectangle) ou 300x600 (Half Page)
          Tipo: Display responsivo
          Comportamento: Sticky para acompanhar o scroll
          
          Instruções para ativação:
          1. Substitua o comentário abaixo pelo código do Google AdSense
          2. Altere showAds para true
          3. Teste o comportamento sticky
        */}
        <div className="bg-muted/30 rounded-lg p-2">
          <div className="text-xs text-muted-foreground text-center mb-2">Publicidade</div>
          {/* INSERIR CÓDIGO DO GOOGLE ADSENSE AQUI */}
          <ins className="adsbygoogle"
               style={{display: 'block'}}
               data-ad-client="ca-pub-XXXXXXXXXX" // Substituir pelo seu Publisher ID
               data-ad-slot="XXXXXXXXXX" // Substituir pelo Ad Slot ID
               data-ad-format="rectangle"
               data-full-width-responsive="true"></ins>
        </div>
      </div>
    </div>
  )
}

export default AdBannerSidebar

