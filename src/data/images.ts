// Photorealistic curated assets featuring Black African professionals in West Africa
// Optimized WebP formats for ultra-fast loading performance
import africanContactCenter from '../assets/images/african_contact_center_1789085972364.webp';
import africanBoardroom from '../assets/images/african_corporate_boardroom_1789085984620.webp';
import africanTechDevs from '../assets/images/african_tech_developers_1789086000427.webp';
import africanLogistics from '../assets/images/african_logistics_manager_1789086013376.webp';
import africanClientAdvisory from '../assets/images/african_client_advisory_1789086025933.webp';
import africanCustomerCare from '../assets/images/african_customer_care_1789196554644.webp';
import africanDigitalInnov from '../assets/images/african_digital_innov_1789196567667.webp';
import africanHospitality from '../assets/images/african_hospitality_1789196580167.webp';
import africanPartnership from '../assets/images/african_partnership_1789196590520.webp';

// Newly generated unique assets - WebP optimized
import heroWestAfrica from '../assets/images/hero_west_africa_1789489921388.webp';
import innovationLab from '../assets/images/innovation_lab_1789489937404.webp';
import ecommerceSales from '../assets/images/ecommerce_sales_1789489951586.webp';
import insuranceAdvisor from '../assets/images/insurance_advisor_1789489967790.webp';
import ngoDevelopment from '../assets/images/ngo_development_1789489984113.webp';
import telecomNetwork from '../assets/images/telecom_network_1789489998049.webp';
import approachStrategy from '../assets/images/approach_strategy_1789490013822.webp';
import contactDesk from '../assets/images/contact_desk_1789490027397.webp';
import aboutLeadership from '../assets/images/about_leadership_1789490084428.webp';

// Original JPG fallback paths
import africanContactCenterJpg from '../assets/images/african_contact_center_1789085972364.jpg';
import africanBoardroomJpg from '../assets/images/african_corporate_boardroom_1789085984620.jpg';
import heroWestAfricaJpg from '../assets/images/hero_west_africa_1789489921388.jpg';

export const LOCAL_IMAGES = {
  // Key sections
  heroImage: heroWestAfrica,
  aboutImage: aboutLeadership,
  approachImage: approachStrategy,
  contactImage: contactDesk,

  // Services - each with its own unique image
  serviceContactCenter: africanContactCenter,
  serviceCustomerCare: africanCustomerCare,
  serviceCrm: africanCustomerCare,
  serviceAdvisory: africanClientAdvisory,
  serviceDigitalWeb: africanTechDevs,
  servicePartnership: africanPartnership,
  serviceDigitalTrans: africanDigitalInnov,
  serviceInnovation: innovationLab,
  serviceEcommerce: ecommerceSales,

  // Sectors
  sectorAssurances: insuranceAdvisor,
  sectorHospitality: africanHospitality,
  sectorLogistics: africanLogistics,
  sectorNgoProjects: ngoDevelopment,
  sectorTelecom: telecomNetwork,

  // Dedicated exports
  africanContactCenter,
  africanBoardroom,
  africanTechDevs,
  africanLogistics,
  africanClientAdvisory,
  africanCustomerCare,
  africanDigitalInnov,
  africanHospitality,
  africanPartnership,
  heroWestAfrica,
  innovationLab,
  ecommerceSales,
  insuranceAdvisor,
  ngoDevelopment,
  telecomNetwork,
  approachStrategy,
  contactDesk,
  aboutLeadership,

  // Fallback mappings
  fallbacks: {
    hero: heroWestAfricaJpg,
    contactCenter: africanContactCenterJpg,
    boardroom: africanBoardroomJpg,
  },
};

export const JPG_FALLBACKS = {
  hero: heroWestAfricaJpg,
  contactCenter: africanContactCenterJpg,
  boardroom: africanBoardroomJpg,
};

