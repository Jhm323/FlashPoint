function injectStructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['ArtGallery', 'CulturalOrganization'],
    name: 'Flashpoint Gallery & Community Space',
    alternateName: 'Flashpoint',
    description: 'A South Philly home for outsider art and community gatherings. Free to enter, community-led, no financial barriers.',
    url: 'https://flashpointphilly.com',
    email: 'flashpointphilly@gmail.com',
    foundingDate: '2025',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1226 Tasker St',
      addressLocality: 'Philadelphia',
      addressRegion: 'PA',
      addressCountry: 'US',
    },
    priceRange: 'Free',
    hasMap: 'https://maps.google.com/?q=1226+Tasker+St+Philadelphia+PA',
    knowsAbout: [
      'Outsider art',
      'Community events',
      'Harm reduction',
      'Mutual aid',
      'South Philadelphia',
    ],
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', injectStructuredData);
