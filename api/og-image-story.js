import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Extrair parâmetros da URL
    const title = searchParams.get('title') || 'QAPlay Blog';
    const imageUrl = searchParams.get('image') || '';
    const author = searchParams.get('author') || 'Nilson Brites';
    
    // Dimensões para Instagram Stories (9:16)
    const width = 1080;
    const height = 1920;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundImage: imageUrl ? `url(${imageUrl})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          {/* Overlay escuro para contraste */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
            }}
          />
          
          {/* Logo QAPlay no topo */}
          <div
            style={{
              position: 'absolute',
              top: 60,
              left: 60,
              zIndex: 10,
            }}
          >
            <img
              src="https://qaplay.com.br/qa-play-logo.png"
              alt="QAPlay Logo"
              style={{
                width: 120,
                height: 120,
              }}
            />
          </div>

          {/* Conteúdo principal */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 80px',
              textAlign: 'center',
              zIndex: 10,
              flex: 1,
            }}
          >
            {/* Título do post */}
            <h1
              style={{
                fontSize: 64,
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
                marginBottom: 40,
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                maxWidth: '90%',
              }}
            >
              {title}
            </h1>
          </div>

          {/* Rodapé com informações */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '60px 80px',
              zIndex: 10,
            }}
          >
            {/* Assinatura */}
            <div
              style={{
                fontSize: 32,
                color: 'white',
                marginBottom: 20,
                textAlign: 'center',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              }}
            >
              Por {author}
            </div>
            
            {/* URL do site */}
            <div
              style={{
                fontSize: 28,
                color: 'white',
                textAlign: 'center',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                fontWeight: 'bold',
              }}
            >
              qaplay.com.br
            </div>
          </div>
        </div>
      ),
      {
        width,
        height,
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
