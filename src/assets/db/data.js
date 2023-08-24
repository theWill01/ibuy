import Image1 from "../images/image1.png";
import Image2 from "../images/image2.png";
import Image3 from "../images/image3.png";
import Image4 from "../images/image4.png";
import image5 from "../images/image5.png";
import Image6 from "../images/image6.png";
import Image7 from "../images/image7.png";
import Image8 from "../images/image8.png";
import quality from "../images/quality.png";
import product from "../images/product.png";
import green from "../images/green.png";
import money from "../images/money.png";
import iphone from "../images/iphone.jpeg";
import Beats from "../images/beats.png";
import Pentax from "../images/camera3.png";
import Oculus from "../images/oculus.png";
import MacBook from "../images/macbook.png";
import AppleWatch from "../images/appleWatch.png";
import img1 from "../images/image1.png";
import img2 from "../images/image2.png";
import img3 from "../images/image3.png";
import img4 from "../images/phone.png";
import img5 from "../images/image5.png";
import img6 from "../images/image6.png";
import img7 from "../images/img7.png";
import img8 from "../images/image8.png";
import Lg from "../images/lg.png";
import Samsung from "../images/samsung.png";
import Iphone from "../images/iphone.png";
import Xiaomi from "../images/xiaomi.png";
import Sony from "../images/sony.png";
import OnePlus from "../images/onePlus.png";
import Huawei from "../images/huawei.png";
import Oppo from "../images/oppo.png";
import Infinix from "../images/infinix.png";
import Tecno from "../images/tecno.png";
import Gionee from "../images/gionee.png";
import Motorolla from "../images/motorolla.png";
const conditions =
  "it shows no signs of cosmetic damage visible from a distance of 12 inches.";
const batteryCondition =
  "When present, batteries have a capacity that exceeds 80% of the new equivalent.";
const guarantee = "Backed by the 90-day iBuy Renewed guarantee.";
export const data = {
  popularBrands: [
    {
      image: iphone,
      label: "Shop Apple",
      className: "phone",
    },
    {
      image: Pentax,
      label: "Shop Pentax",
      className: "camera",
    },
    {
      image: Beats,
      label: "Shop Beats",
      className: "beats",
    },
    {
      image: Oculus,
      label: "Shop Oculus",
      className: "oculus",
    },

    {
      items: [
        {
          id: 1,
          image: MacBook,
          className: "macbook",
          label: "Shop Macbook pro",
        },
        {
          id: 2,
          image: AppleWatch,
          className: "watch",
          label: "Shop Apple Watch",
        },
      ],
    },
  ],
  files: [
    {
      image: img1,
      class: "img1",
    },
    {
      image: img2,
      class: "img2",
    },
    {
      image: img3,
      class: "img3",
    },
    {
      image: img4,
      class: "img4",
    },
    {
      image: img5,
      class: "img5",
    },
    {
      image: img6,
      class: "img6",
    },
    {
      image: img7,
      class: "img7",
    },

    {
      image: img8,
      class: "img8",
    },
  ],
  texts: [
    {
      id: 1,
      head: "Premium condition",
      condition: conditions,
      battery:
        "When present, batteries have a capacity that exceeds 90% of the new equivalent.",
      warranty: "Backed by a one-year satisfaction guarantee.",
      link: "see premium condition products",
    },
    {
      id: 2,
      head: "Excellent condition",
      condition: conditions,
      battery: batteryCondition,
      warranty: guarantee,
      link: "see excellent condition products",
    },
    {
      id: 3,
      head: "Good condition",
      condition: "it shows visible minor imperfections from 12 inches away.",
      battery: batteryCondition,
      warranty: guarantee,
      link: "see good condition products",
    },
    {
      id: 4,
      head: "Acceptable condition",
      condition:
        "scratches are visible when holding the device 12 inches away and perceptive to the touch.",
      battery: batteryCondition,
      warranty: guarantee,
      link: "see acceptable condition products",
    },
  ],
  promise: [
    {
      id: 1,
      image: quality,
      header: "Quality you can afford",
      body: "Shop Amazon Renewed for products that have been refurbished to work like new at affordable prices so you can save on the brands you love.",
    },
    {
      id: 2,
      image: product,
      header: "Products you can trust",
      body: "All products have been professionally inspected, tested and cleaned by iBuy-qualified suppliers.",
    },
    {
      id: 3,
      image: green,
      header: "Purchase with an impact",
      body: "Each Renewed purchase extends the lifetime of a device and keeps e-waste out of landfills",
    },
    {
      id: 4,
      image: money,
      header: "Money back guarantee",
      body: "If you are not fully satisfied you have 90 days to return for a replacement or fully refund",
      extra: "See more>",
    },
  ],
  questions: [
    {
      id: 1,
      header: "What is ibuy Renewed?",
      body: "ibuy Renewed is your trusted destination for pre-owned refurbished products. Products sold on ibuy Renewed are professionally inspected and tested to work as expected by an ibuy qualified and performance-managed supplier. If we source products from a third-party seller, the third-party seller tests and inspects the product",
    },
    {
      id: 2,
      header: "What should i expect to recieve with my ibuy Renewed purchase?",
      body: "Renewed products will come with accesories that may not be original, but will be compatible and fully functional. iBuy Renewed products will be packaged on either original packaging or in a new and lean cardboard box when present, batteries have a capacity that exceeds 80% of the original battery life.",
    },

    {
      id: 3,
      header: "In what condition can i expect my iBuy Renewed product to be?",
      body: "Product will be restored to its original factory settings and will be in one of the following cosmetic conditions : Premium or Excellent - no signs of cosmetic damage when held 12 inches away Good - Light scratches, barely when holding the device 12 inches away. Acceptable - scratches visible when holding the device 12 inches away and perceptible to the touch.",
    },
    {
      id: 4,
      header: "What if im not satisfied with the product i receive?",
      body: "We want you to be delighted with your purchase. If the product does not look or work as expected, you are eligible for a replacement or refund within 90 days of receipt with the ibuy Renewed guarantee, We can also help you troubleshoot technical problems and assist with returns from Your orders, Click on Get Product Support or click on chat/phone for Amazon Customer service. Learn about the ibuy Renewed Guarantee",
    },
  ],
  brands: [
    {
      id: 1,
      label: "LG",
      file: Lg,
      className: "lg",
      content: "TEST",
      key: "lg",
    },
    {
      id: 2,
      label: "SAMSUNG",
      file: Samsung,
      className: "samsung",
      content: "test",
      key: "samsung",
    },
    {
      id: 3,
      label: "IPHONE",
      file: Iphone,
      className: "iphone",
      key: "apple",
    },
    {
      id: 4,
      label: "HUAWEI",
      file: Huawei,
      className: "huawei",
      key: "huawei",
    },
    {
      id: 5,
      label: "XIAOMI",
      file: Xiaomi,
      className: "xiaomi",
      key: "xiaomi",
    },
    {
      id: 6,
      label: "ONE PLUS",
      file: OnePlus,
      className: "one-plus",
      key: "one plus",
    },
    {
      id: 7,
      label: "SONY",
      file: Sony,
      className: "sony",
      key: "sony",
    },
    {
      id: 8,
      label: "OPPO",
      file: Oppo,
      className: "oppo",
      key: "oppo",
    },
    {
      id: 9,
      label: "TECNO",
      file: Tecno,
      className: "tecno",
      key: "tecno",
    },
    {
      id: 10,
      label: "GIONEE",
      file: Gionee,
      className: "gionee",
      key: "gionee",
    },
    {
      id: 11,
      label: "MOTOROLLA",
      file: Motorolla,
      className: "motorolla",
      key: "motorolla",
    },
    {
      id: 12,
      label: "INFINIX",
      file: Infinix,
      className: "infinix",
      key: "infinix",
    },
  ],
};

export const initialProducts = {
  brand: "",
  title: "",
  color: "",
  software: "",
  year: "",
  rom: "",
  ram: "",
  condition: "",
  table: "",
  stars: "",
  price: "",
  quantity: "",
};
