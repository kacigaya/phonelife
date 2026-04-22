const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://phonelife.vercel.app";

export const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RepairShop",
      name: "Phone Life",
      url: siteUrl,
      telephone: "+33658993408",
      address: {
        "@type": "PostalAddress",
        streetAddress: "6 rue Maurice Tenine",
        postalCode: "94260",
        addressLocality: "Fresnes",
        addressCountry: "FR",
      },
      areaServed: [
        "Fresnes",
        "Cachan",
        "Chevilly-Larue",
        "Antony",
        "L'Hay-les-Roses",
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "10:00",
          closes: "19:00",
        },
      ],
    },
    {
      "@type": "RepairShop",
      name: "Phone Life",
      url: siteUrl,
      telephone: "+33605822126",
      address: {
        "@type": "PostalAddress",
        streetAddress: "229 Av. de l'Europe",
        postalCode: "77176",
        addressLocality: "Savigny-le-Temple",
        addressCountry: "FR",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "10:00",
          closes: "19:00",
        },
      ],
    },
  ],
};
