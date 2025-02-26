
// import { SideNavbar } from "@/app/_shared/components/sidemenu/SideNavbar"
import { SideNavbar } from "../_shared/components/sidemenu/SideNavbar"
import '../globals.css'
import Header from "../_shared/components/header/Header"
import { Tap2GetNotification } from "../_shared/components/notification/Notification"
import layoutStyles from "./layout.module.scss"
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Tap2Get',
  description: '',
}

export default function RestaurantLayout({ children, }: { children: React.ReactNode }) {



  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="dashbord flex bg-[#5A8D7D]">
        <SideNavbar />
        <div className={`${layoutStyles.overflowhome} ${layoutStyles.layoutView} w-full bg-white mt-14 lg:mt-0 rounded-tl-[50px] rounded-tr-[50px] lg:rounded-tr-[0px] lg:rounded-l-[50px] py-2 px-3`}>
          <Header />
          {children}
        </div>
      </body>
    </html >
  )
}
