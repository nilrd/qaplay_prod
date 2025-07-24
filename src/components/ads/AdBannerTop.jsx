// Componente de anúncio superior
// Este componente ficará invisível até que o código do Google AdSense seja adicionado
// Baseado nas melhores práticas do Google AdSense para posicionamento

const AdBannerTop = () => {
  // Configuração para mostrar/ocultar anúncios
  const showAds = false // Alterar para true quando o AdSense estiver configurado
  
  if (!showAds) {
    return null // Componente invisível - não ocupa espaço na tela
  }

  return (
    <div className="bg-muted/30 border-b">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-center">
          {/* 
            Posicionamento: Topo da página (Above the fold)
            Tamanho recomendado: 728x90 (Leaderboard) para desktop, 320x50 para mobile
            Tipo: Display responsivo
            
            Instruções para ativação:
            1. Substitua o comentário abaixo pelo código do Google AdSense
            2. Altere showAds para true
            3. Teste em diferentes dispositivos
          */}
          <div className="w-full max-w-4xl">
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

export default AdBannerTop

