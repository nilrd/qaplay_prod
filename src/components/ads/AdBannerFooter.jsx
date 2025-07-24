// Componente de anúncio do rodapé
// Posicionamento no final do conteúdo, antes do footer
// Baseado nas melhores práticas do Google AdSense

const AdBannerFooter = () => {
  // Configuração para mostrar/ocultar anúncios
  const showAds = false // Alterar para true quando o AdSense estiver configurado
  
  if (!showAds) {
    return null // Componente invisível - não ocupa espaço na tela
  }

  return (
    <div className="w-full py-8 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          {/* 
            Posicionamento: Final do conteúdo (Before footer)
            Tamanho recomendado: 728x90 (Leaderboard) ou 970x250 (Billboard)
            Tipo: Display responsivo
            
            Instruções para ativação:
            1. Substitua o comentário abaixo pelo código do Google AdSense
            2. Altere showAds para true
            3. Teste em diferentes tamanhos de tela
          */}
          <div className="w-full max-w-4xl">
            <div className="text-xs text-muted-foreground text-center mb-2">Publicidade</div>
            {/* INSERIR CÓDIGO DO GOOGLE ADSENSE AQUI */}
            <ins className="adsbygoogle"
                 style={{display: 'block'}}
                 data-ad-client="ca-pub-XXXXXXXXXX" // Substituir pelo seu Publisher ID
                 data-ad-slot="XXXXXXXXXX" // Substituir pelo Ad Slot ID
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdBannerFooter

