// "use client"
// import { Navbar as FlowbiteNavbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";

// export default function Navbar() {
//   const serachParems = useSearchParams();
//   const wallet_id = serachParems.get("wallet_id");

//   return (
//     <FlowbiteNavbar fluid rounded>
//       <NavbarBrand href="https://flowbite-react.com">
//         <img className="mr-3" alt="Full" src="/logo.png" width={30} height={30} /> <span className="text-xl">Home Broker Invest</span>
//       </NavbarBrand>
//       <div className="flex md:order-2">
//         <div className="content-center">
//           Olá {wallet_id?.substring(0, 5)}...
//         </div>
//         <NavbarToggle />
//       </div>
//       <NavbarCollapse>
//         <Link href={`/?wallet_id=${wallet_id}`} passHref legacyBehavior>
//           <NavbarLink className="text-xl">Carteira</NavbarLink>
//         </Link>
//         <Link href={`/assets/?wallet_id=${wallet_id}`} passHref legacyBehavior>
//           <NavbarLink className="text-xl">Ativos</NavbarLink>
//         </Link>
//         <Link href="#" passHref legacyBehavior>
//           <NavbarLink className="text-xl">Ordens</NavbarLink>
//         </Link>
//       </NavbarCollapse>
//     </FlowbiteNavbar>
//   )
// }
"use client"
import { Navbar as FlowbiteNavbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Navbar() {
  const searchParams = useSearchParams();  // Corrigido o nome da variável
  const wallet_id = searchParams.get("wallet_id");

  return (
    <FlowbiteNavbar fluid rounded>
      <NavbarBrand href="https://flowbite-react.com">
        <img className="mr-3" alt="Full" src="/logo.png" width={30} height={30} /> <span className="text-xl">Home Broker Invest</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <div className="content-center">
          Olá {wallet_id?.substring(0, 5)}...
        </div>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <Link href={`/?wallet_id=${wallet_id}`} passHref legacyBehavior>
          <NavbarLink className="text-xl">Carteira</NavbarLink>
        </Link>
        <Link href={`/assets/?wallet_id=${wallet_id}`} passHref legacyBehavior>
          <NavbarLink className="text-xl">Ativos</NavbarLink>
        </Link>
        <Link href={`/orders/?wallet_id=${wallet_id}`} passHref legacyBehavior>
          <NavbarLink className="text-xl">Ordens</NavbarLink>
        </Link>
      </NavbarCollapse>
    </FlowbiteNavbar>
  )
}
