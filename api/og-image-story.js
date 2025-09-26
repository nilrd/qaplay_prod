import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || 'QAPlay Blog';
    const imageUrl = searchParams.get('image') || '';
    const author = searchParams.get('author') || 'Nilson Brites';
    
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
        width: 1080,
        height: 1920,
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
