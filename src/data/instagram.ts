// Importation dynamique de tous les fichiers .json créés par Decap CMS dans content/instagram/
const cmsInstaModules = import.meta.glob([
  '../../content/instagram/*.json',
  '../content/instagram/*.json'
], { eager: true });

export const instagramPosts = Object.values(cmsInstaModules).map((fileModule: any) => {
  const data = fileModule.default || fileModule;
  return {
    id: data.id || Math.random().toString(),
    image: data.image || data.imageUrl || '',
    caption: data.caption || '',
    location: data.location || 'Maroc',
    post_url: data.post_url || data.link || 'https://www.instagram.com/smart_orga/',
    likes: data.likes || 0,
    comments: data.comments || 0
  };
});

export default instagramPosts;
