import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const categoriesData = [
    { id: 1, name: "Processors", slug: "processors", createdAt: "2024-09-04 11:27:37.73", updatedAt: "2025-01-16 12:12:13.607" },
    { id: 2, name: "Graphics Cards", slug: "graphics-cards", createdAt: "2024-09-04 11:27:37.73", updatedAt: "2025-01-16 12:12:12.118" },
    { id: 3, name: "Storage", slug: "storage", createdAt: "2024-09-04 11:27:37.73", updatedAt: "2025-01-16 12:12:12.872" },
    { id: 4, name: "Cables", slug: "cables", createdAt: "2024-09-04 11:27:37.73", updatedAt: "2025-01-16 12:12:13.098" },
    { id: 5, name: "Memory", slug: "memory", createdAt: "2024-09-04 11:27:37.73", updatedAt: "2025-01-16 12:12:13.384" },
    { id: 6, name: "Motherboards", slug: "motherboards", createdAt: "2024-09-04 11:27:37.73", updatedAt: "2025-01-16 12:12:14.454" },
    { id: 7, name: "PSU", slug: "psu", createdAt: "2024-09-04 11:27:37.73", updatedAt: "2025-01-16 12:12:13.84" },
    { id: 8, name: "Cases", slug: "cases", createdAt: "2024-09-04 11:27:37.73", updatedAt: "2025-01-16 12:12:14.044" },
    { id: 9, name: "Cooling", slug: "cooling", createdAt: "2024-09-04 11:27:37.73", updatedAt: "2025-01-16 12:12:14.245" },
    { id: 10, name: "Headphones", slug: "headphones", createdAt: "2024-09-10 10:33:00.84", updatedAt: "2025-01-16 12:12:11.232" }
  ]

  const productsData = [
    {
      id: 1,
      name: "AMD Ryzen 9 9950X 4.3 GHz, 80MB, AM5",
      slug: "amd-ryzen-9-9950x",
      description: "<p>The top-of-the-line Ryzen 9 9950X, the world's best processor for Gamers and Creators. AMD's leading efficiency means we have delivered all-new levels of performance within the same envelope. 16 cores, 32 threads, and a 170W TDP<br><br>With a boost frequency of 5.7GHz in gaming you will see awesome framerates in gaming, helped by 80MB of cache in total. This 9950X is unlike any mainstream desktop processor before in terms of performance, but also technologies.<br><br>Built on new AMD 'Zen5' technology, fully compatible with the socket AM5 ecosystem - with leading PCIe gen 5 bandwidth, and fast DDR5 memory support. <br><br>Pairing the new 9950X with an X670E or X670 motherboard will truly make this the most desirable setup for any enthusiast or high-end gamer.</p>",
      price: "739.00",
      sale_price: "",
      purchase_note: "Extended warranty: 1 year",
      visible: true,
      purchasable: true,
      reviews_allowed: true,
      featured: false,
      stock_quantity: 7,
      createdAt: "2024-08-20 12:31:09.969",
      updatedAt: "2024-08-26 06:22:10.746"
    },
    {
      id: 2,
      name: "Asus GeForce RTX 4070 SUPER PRIME OC 12 GB",
      slug: "asus-geforce-rtx-4070-super-prime-oc-12-gb",
      description: "<p><b>Prime GeForce RTX™ 4070 SUPER</b><br>Experience elegant performance with the SFF-Ready PRIME GeForce RTX 4070 SUPER graphics card, featuring a compact 2.5-slot design for expansive compatibility, enhanced by a triple-fan setup for superior airflow. Its sleek design seamlessly integrates with the ASUS PRIME ecosystem, ensuring both visual appeal and gaming prowess.<br><br>Axial-tech Upgrades<br><b>A Fresh Spin</b><br>Three tried-and-true Axial-tech fans feature a smaller hub that facilitates longer blades and a barrier ring to increase downward air pressure for lower temperatures, less noise, and higher performance<br><br>Auto−Extreme Technology<br><b>Reliability Boost</b><br>Auto-Extreme Technology is an automated manufacturing process that sets new standards in the industry by allowing all soldering to be completed in a single pass. This reduces thermal strain on components and avoids the use of harsh cleaning chemicals, resulting in less environmental impact, lower manufacturing power consumption and a more reliable product overall.<br><br>Protective Backplate<br><b>No flexin'</b><br>The PCB is reinforced by a backplate that adds structural rigidity, helping to prevent flex and protect components and trace pathways from damage.<br><br>Dual BIOS<br><b>Choose wisely</b><br>Do you prioritize low core temps or low noise levels? Performance mode will let the fans spin up to keep the card running cool all the time. Quiet mode keeps the same power target and top-end settings, but it offers a less aggressive fan curve for quieter operation at medium temps. For even more customization and control, check out our GPU Tweak III software.<br><br>144-hour Validation Program<br><b>Extensive may be an understatement</b><br>A 144-hour validation program puts cards through a series of stringent tests to ensure compatibility with the latest games.<br><br>Stainless Steel Bracket<br><b>Steel yourself</b><br>The mounting bracket for the PRIME GeForce RTX 4070 SUPER features grade 304 stainless steel, chosen for its strength and high resistance to corrosion.<br><br>GPU Tweak III<br><b>Monitor, tweak, and tune</b><br>The ASUS GPU Tweak III utility takes graphics card tuning to the next level. It lets you tweak critical parameters including GPU core clocks, memory frequency and voltage settings, with the option to monitor everything in real-time through a customizable on-screen display. Advanced fan control is also included along with many more features to help you get the most out of your graphics card.<br><br>QuantumCloud<br><b>Profit from GPU power</b><br>QuantumCloud is a safe and easy-to-use application that lets you effortlessly earn extra money by sharing your graphics card's computing power. Earnings are accessible through your PayPal or WeChat account, and QuantumCloud also supports multiple exchange methods, including Steam. In addition, QuantumCloud doesn't collect any personal data, so your privacy stays protected. Get started right away with just one click!<br><br><b>PAIR WITH A PSU</b><br>Use our wattage calculator to estimate how much power you'll need to fuel your rig, and then pick a compatible ROG, TUF Gaming or Prime power supply for ultimate performance.<br><br>NVIDIA DLSS 3<br><b>Max FPS. Max Quality. Powered by AI.</b><br>DLSS is a revolutionary breakthrough in AI graphics that multiplies performance. Powered by the new fourth-gen Tensor Cores and Optical Flow Accelerator on GeForce RTX 40 Series GPUs, DLSS 3 uses AI to create additional frames and improve image quality.<br><br>Further With AI, Faster on RTX<br><b>Get next-level AI performance on GeForce RTX.</b><br>Discover the RTX AI advantage. Built for the era of AI, GeForce RTX™ GPUs feature specialized AI Tensor Cores that deliver cutting-edge performance and revolutionary capabilities. From enhanced creativity and ultra-efficient productivity to blisteringly fast gaming, the ultimate in AI power on Windows PCs is on RTX.</p>",
      price: "739.90",
      sale_price: "",
      purchase_note: "",
      visible: true,
      purchasable: true,
      reviews_allowed: true,
      featured: false,
      stock_quantity: 5,
      createdAt: "2024-08-21 06:04:44.686",
      updatedAt: "2024-09-03 11:46:59.293"
    },
    {
      id: 3,
      name: "Kingston FURY Renegade 1TB, PCIe 4.0, M.2",
      slug: "kingston-fury-renegade-1tb",
      description: "<div><p>Kingston FURY™ Renegade PCIe 4.0 NVMe M.2 SSD provides cutting-edge performance in high capacities for gaming and hardware enthusiasts seeking extreme performance for PC builds and upgrades. By leveraging the latest Gen 4x4 NVMe controller and 3D TLC NAND, Kingston FURY Renegade SSD offers blazing speeds of up to 7,300/7,000MB/s read/write and up to 1,000,000 IOPS for amazing consistency and exceptional gaming experience. From game and application loading times to streaming and capturing, give your system a boost in overall responsiveness. </p><p>Kingston FURY Renegade SSD matches the top-tier performance of the Kingston FURY Renegade memory line to produce the ultimate team to keep you at the top of your game.</p> <p>Available in capacities from 500GB-4TB to store an extensive library of your favourite games and media.</p> <ul> <li>Incredible PCIe Gen 4x4 NVMe performance</li> <li>Slim M.2 2280 form factor</li> <li>High capacities of up to 4TB</li> </ul><p></p></div>",
      price: "119.90",
      sale_price: "94.90",
      purchase_note: " ",
      visible: true,
      purchasable: true,
      reviews_allowed: true,
      featured: false,
      stock_quantity: 0,
      createdAt: "2024-08-21 10:54:10.041",
      updatedAt: "2024-08-30 12:55:34.926"
    },
    {
      id: 4,
      name: "Deltaco DisplayPort - HDMI - cable, 2 m",
      slug: "deltaco-displayport-hdmi-cable",
      description: "<p>DELTACO DisplayPort to HDMI cable with audio, Ultra HD @30Hz, 2m, black, 20-pin male - 19-pin male,<br><br>This cable can for example be used for connecting a computer with displayport output to a TV that has HDMI.</p>",
      price: "10.90",
      sale_price: "",
      purchase_note: "",
      visible: true,
      purchasable: true,
      reviews_allowed: true,
      featured: false,
      stock_quantity: 10,
      createdAt: "2024-08-26 12:55:47.746",
      updatedAt: "2024-08-30 13:15:21.26"
    },
    {
      id: 5,
      name: "ASROCK AMD Radeon RX 6750 XT Challenger Pro 12GB OC",
      slug: "asrock-amd-radeon-rx-6750-xt-challenger-pro-12gb-oc",
      description: "<p><b>OC Edition<br>Great Performance.</b><br>Delivers great performance which is more higher than reference cards based on the solid hardware design.<br><br><b>Triple Fan Design</b><br>Triple fan design helps to optimize system cooling to reduce the operating temperature.<br><br><b>Stylish Metal Backplate<br>Solid, Fancy, Cool.</b><br>Designed to avoid PCB bending. The fancy outlook makes the graphic card more legendary in visual. It also helps to enhance cooling with the premium thermal pads equipped backside.<br><br><b>Striped Axial Fan<br>Designed For Enhanced Airflow.</b><br>ASRock's custom Striped Axial Fan delivers enhanced airflow to optimize cooling from not only the stripe structure on each fan blade but also the polishing surface on the bottom side.<br><br><b>0dB Silent Cooling<br>Spin For Cooling, Stop For Silence.</b><br>The fan spins when the temperature goes high for the optimal cooling, and stops when the temperature goes low for the complete silence.<br><br><b>Ultra-fit Heatpipe<br>Consolidated to Maximize the Contact.</b><br>The heatpipes are consolidated to maximize the contact among each others and also the GPU baseplate for the optimized heat dissipation.<br><br><b>High-density Metal Welding<br>Improve Heat Dissipation.</b><br>Effectively isolate all coverage of the gap between pipe and stacked fins, hence improve heat dissipation effectively.<br><br><b>Nano Thermal Paste<br>Perfect Thermal Teamwork.</b><br>Eliminate the gaps in the contact area to maximize heat transfer and thermal efficiency.<br><br><b>Premium Thermal Pad<br>Better Heat Transfer.</b><br>The premium thermal pad helps to transfer the heat of the components to the heatsink, improving heat dissipation.<br><br><b>Precise Screw Torque<br>Optimized Mounting Pressure.</b><br>ASRock adopts precise screw torque when assembling its graphics cards to optimize the cooler mounting pressure to improve thermal efficiency while avoiding damage to GPU die.<br><br><b>Dr. MOS</b><br>Dr.MOS is the integrated power stage solution which is optimized for synchronous buck-set down voltage applications! Intelligently delivering higher current and driving up to 60A continuous current for each phase, thus providing improved thermal result and superior performance.<br><br><b>Premium 90A Power Choke</b><br>Compared to traditional chokes, ASRock's premium 90A power chokes effectively make the saturation current up to three times better, thus providing enhanced and improved Vcore voltage to the graphics card.<br><br><b>High Density Glass Fabric PCB</b><br>High Density Glass Fabric PCB design that reduces the gaps between the PCB layers to protect the graphics card against electrical shorts caused by humidity.<br><br><b>2oz Copper PCB</b><br>Using only carefully selected copper materials for PCB layers, 2oz Copper PCB delivers lower temperature and higher energy efficiency for overclocking.<br><br><b>Matte Black PCB</b><br>A new mysterious matte black and copper color scheme to match the prestigious components on ASRock's high-end graphics card.<br><br><b>ASRock Tweak 2.0<br>Pro and Easy-to-Use Tuning Utility.</b><br>Provides the smart fan speed control and instant performance tweaking.<br><br><b>8K Resolution Support</b><br>Not only can it handles 4K graphics but also supports the next generation 8K video output for the ultimate visual experience.<br><br><b>PCI® Express 4.0 Support</b><br>This graphics card features PCI® Express 4.0 support, with a throughput of 16 GT/s and enables two times the bandwidth compared to PCI® Express 3.0. Get ready for the next generation of PC gaming.<br><br>The new AMD Radeon™ RX 6950 XT, RX 6750 XT, and RX 6650 XT graphic cards are optimized for DirectStorage to help reduce load times in games and bring expansive worlds to life in amazing detail. The Radeon™ RX 6000 Series graphic cards take full advantage of the latest innovations in upscaling technologies such as AMD FidelityFX ™ Super Resolution2 or the new Radeon™ Super Resolution. Whether it is AAA gaming or eSports, experience all your games without compromise.<br><br><b>SUPERCHARGED PERFORMANCE</b><br>The Radeon™ RX 6000 Series graphics cards can take on the most demanding titles at maximum settings with all the latest features enabled. With up to 80 powerful graphics compute units, coupled with up to 16GB of high speed GDDR6 memory, and up to 128MB of low latency AMD Infinity Cache™, these cards redefine enthusiast level performance.<br><br><b>VIVID VISUALS</b><br>Experience a new level of immersion with the Radeon™ RX 6000 Series graphics cards with support for the latest software innovations such as DirectX 12 Ultimate and the latest AMD FidelityFX ™ technology feature set, enabling realistic lighting, shadows, and reflections in extreme detail. AMD FidelityFX ™ technology features are optimized for the AMD RDNA™ 2 architecture to power the next generation of gaming visuals at high framerates, providing a mesmerizing gaming experience.<br><br><b>ELEVATED EXPERIENCE</b><br>The new Radeon™ RX 6000 Series graphic cards are optimized for DirectStorage to help reduce load times in games and bring expansive worlds to life in amazing detail. Complete the experience with the widest available display ecosystem on the market3, supporting the latest HDMI™ 2.1 VRR technology with the 2000+ AMD FreeSync4 technology enabled gaming displays available at high refresh rates. With the new AMD Link™ 5.05, enjoy co op with up to 4 players and experience your games across different devices seamlessly, as easy as clicking a button.<br><br><b>GET A BOOST IN FRAMES<br>FOR YOUR GAMES</b><br>Maximize image quality and supercharge performance with AMD FidelityFX ™ Super Resolution (FSR)2 across select supported games or boost your frame rates across a wide number of games with Radeon™ Super Resolution (RSR)1 to deliver high quality, high resolution, and high framerate gaming experiences on AMD Radeon™ graphics cards.<br><br><b>THE BEST GAMING EXPERIENCE<br>FOR THE BEST GAMING OS</b><br>Windows 11 is created for the ultimate PC gaming, featuring superior graphics, amazing speed, and an incredible selection of games. Windows 11 includes gaming features like DirectX 12 Ultimate, DirectStorage , and Auto HDR. AMD processors, graphics, and software all stand ready to supercharge your gaming experience with the new operating system from day one.</p>",
      price: "381.90",
      sale_price: "",
      purchase_note: "",
      visible: true,
      purchasable: true,
      reviews_allowed: true,
      featured: false,
      stock_quantity: 3,
      createdAt: "2024-08-29 08:44:57.745",
      updatedAt: "2024-11-21 11:35:08.409"
    },
    {
      id: 6,
      name: "Kingston A400 960GB, SATA III, 2.5\" - SSD",
      slug: "kingston-a400-960gb,-sata-iii,-2.5\"---ssd",
      description: "<p>Kingston's A400 solid-state drive dramatically improves the responsiveness of your existing system with incredible boot, loading and transfer times compared to mechanical hard drives. Powered by a latest-gen controller for read and write speeds of up to 500MB/s and 450MB/s, this SSD is 10x faster than a traditional hard drive for higher performance, ultra-responsive multi-tasking and an overall faster system.\n</p><p>Also more reliable and durable than a hard drive, A400 is built with Flash memory. There are no moving parts, making it less likely to fail than a mechanical hard drive. It is also cooler and quieter, and its shock and vibration resistance makes it ideal for notebooks and other mobile computing devices.</p>\n<p>A400 is available in multiple drive form factors and capacities from 120GB-1.92TB to give you all the space you need for applications, videos, photos and other important documents. You can also replace your hard drive or a smaller SSD with a drive big enough to hold all your files.</p>\n<p>This SSD is designed for use in desktop and notebook computer workloads and is not intended for server environments.</p>\n<ul>\n<li>Fast start-up, loading and file transfers</li>\n<li>More reliable and durable than a hard drive</li>\n<li>Multiple capacities with space for applications or a hard drive replacement</li>\n</ul><p></p>",
      price: "64.90",
      sale_price: "54.90",
      purchase_note: "",
      visible: true,
      purchasable: true,
      reviews_allowed: true,
      featured: false,
      stock_quantity: 30,
      createdAt: "2024-08-29 09:11:53.129",
      updatedAt: "2024-08-30 12:56:23.13"
    },
    {
      id: 7,
      name: "Fractal Design North - Charcoal Black",
      slug: "fractal-design-north---charcoal-black",
      description: "<p>The North Charcoal Black Tempered Glass Dark Tint case reimagines the gaming PC, introducing natural materials and bespoke details to make your gaming setup a stylish addition to any living space. It supports ATX, mATX, and Mini-ITX motherboards and can fit graphics cards up to 355 mm with a front fan mounted, or up to 300 mm with a 360 mm front radiator. This means you can build a powerful system with ample room for components in a mid-sized form factor.<br><br>This case makes managing your cables easy. The open front design and fine-patterned mesh ventilation ensure natural airflow, while the removable side panels and top panel with an integrated tab simplify installation and cable management. The high airflow nylon filters on the front and PSU are easy to remove and clean, keeping dust out and air flowing smoothly.<br><br>Built for performance and aesthetics, the North Charcoal Black TG Dark Tint features sleek wood and alloy details complemented by brass or steel accents. It comes with two pre-installed 140 mm Aspect PWM fans for excellent cooling, and the intuitive interior layout ensures a smooth building experience.<br><br><strong>Key Specifications:</strong><br>\n</p><ul>\n<li>Drive mounts: 2x 2.5\" and 3x 3.5\"/2.5\" (2 included)</li>\n<li>Expansion slots: 7</li>\n<li>Motherboard compatibility: ATX, mATX, Mini-ITX</li>\n<li>Power supply type: ATX</li>\n<li>Front interface:\n<ul>\n<li>1x USB 3.1 Gen 2 Type-C</li>\n<li>2x USB 3.0</li>\n<li>Audio &amp; Mic</li>\n</ul>\n</li>\n<li>Fan mounts: Up to 6x 120 mm or 4x 140 mm</li>\n<li>Radiator support: Front - up to 360 mm, Top - up to 240 mm, Rear - 120 mm</li>\n<li>Dust filters: Front, PSU</li>\n<li>Dimensions (LxWxH): 447 x 215 x 469 mm</li>\n<li>Weight: 7.7 kg</li>\n</ul>\n<strong>Packaging Contents:</strong><br>\n<ul>\n<li>North Charcoal Black Tempered Glass Dark Tint case</li>\n<li>Accessory box</li>\n<li>User manual</li>\n</ul><p></p>",
      price: "149.90",
      sale_price: "",
      purchase_note: "",
      visible: true,
      purchasable: true,
      reviews_allowed: false,
      featured: false,
      stock_quantity: 14,
      createdAt: "2024-09-02 13:16:13.631",
      updatedAt: "2024-10-29 12:10:46.945"
    },
    {
      id: 8,
      name: "G733 LIGHTSPEED Wireless RGB Gaming Headset",
      slug: "g733-lightspeed-wireless-rgb-gaming-headset",
      description: "<p>Meet G733, a gaming headset designed to suit your style. Embrace total wireless with 2.4 GHZ LIGHTSPEED wireless, featuring up to 20 m of range and up to 29 hours of battery life. <br><br>Customize how you look and sound in G HUB with dual-zone, front-facing LIGHTSYNC RGB and Blue VO!CE real-time voice filters. <br><br>G733 features advanced audio technologies, including 40 mm PRO-G audio drivers, internal acoustic chambers, and DTS Headphone:X 2.0. <br><br>Play your way with four colorways to choose from and play with comfort with a comfortable, reversible headband, dual-layer memory foam earcups, and a lightweight headset that weighs just 278 g.</p>",
      price: "123.90",
      sale_price: "",
      purchase_note: "",
      visible: true,
      purchasable: true,
      reviews_allowed: true,
      featured: false,
      stock_quantity: 10,
      createdAt: "2024-09-10 10:33:44.234",
      updatedAt: "2024-12-17 08:40:49.755"
    }
  ]

  const imagesData = [
    { id: 1, alt: "amd-ryzen-9-9950x-4-3-ghz-80mb-am5-no-cooler-incl-processor-boxed", src: ["https://wolfey.s-ul.eu/6S7dh2rF"], createdAt: "2024-09-04 11:27:37.73", updatedAt: "2024-09-04 11:27:37.73", productsId: 1 },
    { id: 2, alt: "asus-geforce-rtx-4070-super-prime-oc-12-gb", src: ["https://wolfey.s-ul.eu/cjUQ1C2T", "https://wolfey.s-ul.eu/IgDhdni0"], createdAt: "2024-09-04 11:27:37.73", updatedAt: "2024-09-04 11:27:37.73", productsId: 2 },
    { id: 3, alt: "kingston-fury-renegade-1tb", src: ["https://wolfey.s-ul.eu/DtcK5kwq", "https://wolfey.s-ul.eu/7esXDwfy", "https://wolfey.s-ul.eu/F1zstXgX"], createdAt: "2024-09-04 11:27:37.73", updatedAt: "2024-09-04 11:27:37.73", productsId: 3 },
    { id: 4, alt: "deltaco-displayport-hdmi-cable", src: ["https://wolfey.s-ul.eu/zzsjDvdl", "https://wolfey.s-ul.eu/wiqK4dbP"], createdAt: "2024-09-04 11:27:37.73", updatedAt: "2024-09-04 11:27:37.73", productsId: 4 },
    { id: 5, alt: "asrock-amd-radeon-rx-6750-xt-challenger-pro-12gb-oc", src: ["https://wolfey.s-ul.eu/Ts8l5OlH", "https://wolfey.s-ul.eu/PXqPbra6", "https://wolfey.s-ul.eu/GbJ7UdDZ", "https://wolfey.s-ul.eu/LkaqJc5I"], createdAt: "2024-09-04 11:27:37.73", updatedAt: "2024-11-21 11:35:08.409", productsId: 5 },
    { id: 6, alt: "kingston-a400-960gb,-sata-iii,-2.5\"---ssd", src: ["https://wolfey.s-ul.eu/gHbdUvKK"], createdAt: "2024-09-04 11:27:37.73", updatedAt: "2024-09-04 11:27:37.73", productsId: 6 },
    { id: 7, alt: "fractal-design-north---charcoal-black", src: ["https://wolfey.s-ul.eu/QWXETPpz"], createdAt: "2024-09-04 11:27:37.73", updatedAt: "2024-10-29 12:10:46.945", productsId: 7 },
    { id: 8, alt: "g733-lightspeed-wireless-rgb-gaming-headset", src: ["https://wolfey.s-ul.eu/Sw8UGB10"], createdAt: "2024-09-10 10:33:44.234", updatedAt: "2024-12-17 08:40:49.755", productsId: 8 }
  ]

  console.log('Seeding categories...')
  for (const category of categoriesData) {
    await prisma.categories.upsert({
      where: { id: category.id },
      update: {
        name: category.name,
        slug: category.slug,
        updatedAt: new Date(category.updatedAt),
      },
      create: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        createdAt: new Date(category.createdAt),
        updatedAt: new Date(category.updatedAt),
      },
    })
  }

  const productCategoryMap: { [key: number]: number[] } = {
    1: [1],
    2: [2],
    3: [3],
    4: [4],
    5: [2],
    6: [3],
    7: [8],
    8: [10],
  }

  console.log('Seeding products...')
  for (const product of productsData) {
    const categoryIds = productCategoryMap[product.id] || []

    await prisma.products.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        sale_price: product.sale_price || null,
        purchase_note: product.purchase_note || null,
        visible: product.visible,
        purchasable: product.purchasable,
        reviews_allowed: product.reviews_allowed,
        featured: product.featured,
        stock_quantity: product.stock_quantity,
        updatedAt: new Date(product.updatedAt),
        categories: {
          set: categoryIds.map(id => ({ id })),
        },
      },
      create: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        sale_price: product.sale_price || null,
        purchase_note: product.purchase_note || null,
        visible: product.visible,
        purchasable: product.purchasable,
        reviews_allowed: product.reviews_allowed,
        featured: product.featured,
        stock_quantity: product.stock_quantity,
        createdAt: new Date(product.createdAt),
        updatedAt: new Date(product.updatedAt),
        categories: {
          connect: categoryIds.map(id => ({ id })),
        },
      },
    })
  }

  console.log('Seeding images...')
  for (const image of imagesData) {
    await prisma.images.upsert({
      where: { id: image.id },
      update: {
        alt: image.alt,
        src: image.src,
        updatedAt: new Date(image.updatedAt),
        productsId: image.productsId,
      },
      create: {
        id: image.id,
        alt: image.alt,
        src: image.src,
        createdAt: new Date(image.createdAt),
        updatedAt: new Date(image.updatedAt),
        productsId: image.productsId,
      },
    })
  }

  console.log('Seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })