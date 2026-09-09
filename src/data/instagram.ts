const modules = import.meta.glob('/content/instagram/*.json', { eager: true });

export const instagramPosts = Object.values(modules).map((file: any) => {
  const data = file.default || file;
  return {
    id: data.id || Math.random().toString(),
    image: data.image || '',
    caption: data.caption || '',
    location: data.location || '',
    post_url: data.post_url || 'https://www.instagram.com/smart_orga/'
  };
});

export default instagramPosts;
