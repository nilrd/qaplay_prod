import { useEffect } from 'react';

export const useSEO = ({ title, description, image, url, type = 'article' }) => {
  useEffect(() => {
    // Atualizar título da página
    document.title = title;

    // Garantir URLs absolutas
    const baseUrl = 'https://qaplay-prod.vercel.app';
    const absoluteImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/qa-play-logo.png`;
    const absoluteUrl = url ? (url.startsWith('http') ? url : `${baseUrl}${url}`) : window.location.href;

    // Meta tags básicas
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', 'QA, Quality Assurance, Testes de Software, Automação, Nilson Brites, QAPlay');

    // Open Graph tags com URLs absolutas
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', absoluteImage);
    updateMetaTag('property', 'og:url', absoluteUrl);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:site_name', 'QAPlay');
    updateMetaTag('property', 'og:locale', 'pt_BR');

    // Twitter Card tags com URLs absolutas
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', absoluteImage);
    updateMetaTag('name', 'twitter:site', '@qaplay');
    updateMetaTag('name', 'twitter:creator', '@nilsbrites');

    // Meta tags adicionais
    updateMetaTag('name', 'author', 'Nilson Brites');
    updateMetaTag('name', 'robots', 'index, follow');
    updateMetaTag('name', 'language', 'pt-BR');

    // Canonical URL
    updateCanonicalUrl(absoluteUrl);

  }, [title, description, image, url, type]);
};

const updateMetaTag = (attribute, name, content) => {
  if (!content) return;

  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (meta) {
    meta.setAttribute('content', content);
  } else {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  }
};

const updateCanonicalUrl = (url) => {
  if (!url) return;

  let canonical = document.querySelector('link[rel="canonical"]');
  
  if (canonical) {
    canonical.setAttribute('href', url);
  } else {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', url);
    document.head.appendChild(canonical);
  }
};
