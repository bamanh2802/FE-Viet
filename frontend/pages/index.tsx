import { Button,Input } from "@nextui-org/react"
import { CheckIcon, SearchIcon, ShareIcon, UsersIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import SignInForm from "@/components/global/SignInForm"

export default function VietLandingPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  }


  const [isOpenSignIn, setIsOpenSignIn] = useState<boolean>(false)

  const handleToggleSignIn = () => {
    setIsOpenSignIn(!isOpenSignIn)
    console.log('hello')
  }


  return (
    <div className="flex flex-col min-h-screen bg-gray-300 text-zinc-900 overflow-y-scroll">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-4 lg:px-6 h-14 flex items-center fixed w-screen"
      >
        <Link className="flex items-center justify-center" href="#">
          <span className="ml-2 text-2xl font-bold">Viet</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Tính năng
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#knowledge-management">
            Quản lý tri thức
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#llm-interaction">
            Tương tác LLM
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#search">
            Tìm kiếm
          </Link>
        </nav>
      </motion.header>
      <main className="flex-1 h-screen w-screen snap-y snap-mandatory overflow-y-auto flex flex-col items-center justify-center">
        <div className="h-screen w-screen snap-start">
            <motion.section
            initial="hidden"
            viewport={{ margin: '-500px' }}
            whileInView="visible"
            variants={staggerChildren}
            className=" h-screen w-screen py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center"
            >
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                <motion.div variants={fadeInUp} className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Viet – Trợ lý AI hỗ trợ quản lý và nghiên cứu tri thức hiệu quả
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Giúp bạn quản lý tri thức, tương tác với các mô hình ngôn ngữ lớn (LLMs), tìm kiếm và chia sẻ kiến thức một cách thông minh và tiện lợi.
                    </p>
                </motion.div>
                <motion.div variants={fadeInUp} className="space-x-4">
                    <Button
                        onClick={() => (handleToggleSignIn())}
                    >Khám phá ngay</Button>
                    <Button variant="bordered" className="text-slate-800">
                    <Link className="flex items-center justify-center" href="#features">
                    Tìm hiểu thêm
                    </Link>
                    </Button>
                </motion.div>
                </div>
            </div>
            </motion.section>
            
        </div>
        <div className="h-screen w-screen snap-start">
            <motion.section
            initial="hidden"
            viewport={{ margin: '-500px' }}
            whileInView="visible"
            variants={staggerChildren}
            id="features"
            className="h-screen w-screen flex justify-center items-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 snap-start"
            >
            <div className="container px-4 md:px-6 max-w-6xl">
                <motion.h2 variants={fadeInUp} className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-24">Tính năng nổi bật</motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
                    <CheckIcon className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Quản lý tri thức thông minh</h3>
                    <p className="text-gray-500 dark:text-gray-400">Quản lý tài liệu, hình ảnh, bảng biểu theo tags và metadata một cách linh hoạt.</p>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
                    <UsersIcon className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Tương tác với LLMs</h3>
                    <p className="text-gray-500 dark:text-gray-400">Tạo cuộc trò chuyện nhóm hoặc cá nhân với LLMs, hỗ trợ tóm tắt, hỏi đáp và trích xuất ý chính từ tài liệu.</p>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
                    <SearchIcon className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Tìm kiếm mạnh mẽ</h3>
                    <p className="text-gray-500 dark:text-gray-400">Tìm kiếm theo từ khóa và ngữ nghĩa trong toàn bộ hệ thống, từ tài liệu đến hình ảnh và bảng biểu.</p>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
                    <ShareIcon className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Tính năng cộng đồng</h3>
                    <p className="text-gray-500 dark:text-gray-400">Chia sẻ cuộc trò chuyện, tài liệu, và dự án dễ dàng với đồng nghiệp và đối tác qua URL.</p>
                </motion.div>
                </div>
            </div>
            </motion.section>
        </div>
       <div className="h-screen w-screen snap-start">
        <motion.section
            initial="hidden"
            viewport={{ margin: '-500px' }}
            whileInView="visible"
            variants={staggerChildren}
            id="knowledge-management"
            className="h-screen w-screen py-12 md:py-24 lg:py-32 flex justify-center items-center snap-start"
            >
            <div className="container px-4 md:px-6 flex items-center justify-center">
                <div className="max-w-6xl grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                <motion.div variants={fadeInUp} className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Quản lý tri thức dễ dàng, hiệu quả</h2>
                    <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        Tổ chức và quản lý tài liệu, hình ảnh, bảng biểu theo cách của bạn với tags và metadata do bạn định nghĩa.
                    </p>
                    </div>
                    <ul className="grid gap-2 py-4">
                    <motion.li variants={fadeInUp} className="flex items-center">
                        <CheckIcon className="mr-2 h-5 w-5" />
                        Quản lý dự án với tài liệu, hình ảnh, và bảng biểu
                    </motion.li>
                    <motion.li variants={fadeInUp} className="flex items-center">
                        <CheckIcon className="mr-2 h-5 w-5" />
                        Tự động bóc tách tiêu đề và thông tin từ tài liệu
                    </motion.li>
                    <motion.li variants={fadeInUp} className="flex items-center">
                        <CheckIcon className="mr-2 h-5 w-5" />
                        Thêm ghi chú từ câu trả lời của LLM hoặc ghi chú cá nhân
                    </motion.li>
                    </ul>
                </motion.div>
                <motion.div variants={scaleIn}>
                    <Image
                    src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                    width={550}
                    height={400}
                    alt="Quản lý tri thức với Viet"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                    />
                </motion.div>
                </div>
            </div>
            </motion.section>
       </div>
        <div className="h-screen w-screen snap-start">
            <motion.section
            initial="hidden"
            viewport={{ margin: '-500px' }}
            whileInView="visible"
            variants={staggerChildren}
            id="llm-interaction"
            className="h-screen w-screen py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex justify-center items-center snap-start"
            >
            <div className="container px-4 md:px-6 flex items-center justify-center">
                <div className="max-w-6xl grid items-center gap-6 lg:grid-cols-[500px_1fr] lg:gap-12 xl:grid-cols-[550px_1fr]">
                <motion.div variants={scaleIn}>
                    <Image
                    src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                    width={550}
                    height={400}
                    alt="Tương tác với LLMs trong Viet"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    />
                </motion.div>
                <motion.div variants={fadeInUp} className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tương tác thông minh với LLMs</h2>
                    <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        Tạo cuộc trò chuyện với LLMs trong dự án của bạn để hỏi đáp, tóm tắt và trích xuất ý chính từ tài liệu. Chia sẻ kết quả với nhóm của bạn dễ dàng.
                    </p>
                    </div>
                    <ul className="grid gap-2 py-4">
                    <motion.li variants={fadeInUp} className="flex items-center">
                        <CheckIcon className="mr-2 h-5 w-5" />
                        Tạo cuộc trò chuyện nhóm với nhiều người dùng và một LLM
                    </motion.li>
                    <motion.li variants={fadeInUp} className="flex items-center">
                        <CheckIcon className="mr-2 h-5 w-5" />
                        Tóm tắt, hỏi đáp, trích xuất sơ đồ tư duy, và định nghĩa từ khóa
                    </motion.li>
                    </ul>
                </motion.div>
                </div>
            </div>
            </motion.section>
        </div>
        <div className="h-screen w-screen snap-start">
        <motion.section
          initial="hidden"
          viewport={{ margin: '-500px' }}
          whileInView="visible"
          variants={staggerChildren}
          id="search"
          className="w-full py-12 md:py-24 lg:py-32 flex justify-center items-center snap-start"
        >
          <div className="container px-4 md:px-6 flex items-center justify-center">
            <div className="max-w-6xl grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <motion.div variants={fadeInUp} className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tìm kiếm tri thức thông minh</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Tìm kiếm thông tin nhanh chóng và chính xác từ tài liệu, hình ảnh và bảng biểu bằng công nghệ tìm kiếm ngữ nghĩa tiên tiến.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <motion.li variants={fadeInUp}  className="flex items-center">
                    <CheckIcon className="mr-2 h-5 w-5" />
                    Tìm kiếm theo từ khóa và ngữ nghĩa
                  </motion.li>
                  <motion.li variants={fadeInUp} className="flex items-center">
                    <CheckIcon className="mr-2 h-5 w-5" />
                    Tìm kiếm theo tags, tiêu đề và nội dung trong từng dự án hoặc toàn bộ tri thức
                  </motion.li>
                  <motion.li variants={fadeInUp} className="flex items-center">
                    <CheckIcon className="mr-2 h-5 w-5" />
                    Tìm kiếm thông tin trong hình ảnh, bảng biểu và đoạn thông tin
                  </motion.li>
                </ul>
              </motion.div>
              <motion.div variants={scaleIn}>
                <Image
                  src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  width={550}
                  height={400}
                  alt="Tìm kiếm tri thức với Viet"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        </div>
        <div className="h-screen w-screen snap-start">
        <motion.section
          initial="hidden"
          viewport={{ margin: '-500px' }}
          whileInView="visible"
          variants={staggerChildren}
          className="snap-start h-screen w-screen py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex justify-center items-center"
        >
          <div className="container px-4 md:px-6 flex items-center justify-center">
            <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center space-y-4 text-center max-w-6xl">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Chia sẻ và hợp tác dễ dàng</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Chia sẻ cuộc trò chuyện, tài liệu, và dự án qua URL để cùng cộng tác với nhóm của bạn.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="w-full" size="lg">
                    Bắt đầu chia sẻ ngay
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        </div>
        <div className="h-screen w-screen snap-start">
        <motion.section
          initial="hidden"
          viewport={{ margin: '-500px' }}
          whileInView="visible"
          variants={staggerChildren}
          className="snap-start h-screen w-screen py-12 md:py-24 lg:py-32 flex justify-center items-center"
        >
          <div className="container px-4 md:px-6 flex items-center justify-center">
            <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center space-y-4 text-center max-w-6xl">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Khám phá Viet ngay hôm nay</h2>
                <p className="max-w-[900px] text-gray-500 m-auto md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Đơn giản hóa việc quản lý tri thức và hợp tác hiệu quả hơn với Viet.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Nhập email của bạn" type="email" />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button type="submit">Đăng ký ngay</Button>
                  </motion.div>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Bằng cách đăng ký, bạn đồng ý với{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Điều khoản dịch vụ
                  </Link>{" "}
                  và{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Chính sách bảo mật
                  </Link>{" "}
                  của chúng tôi.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        </div>
        <div className="h-screen w-screen snap-start">
        <motion.section
          initial="hidden"
          viewport={{ margin: '-500px' }}
          whileInView="visible"
          variants={staggerChildren}
          className="snap-start h-screen w-screen py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex justify-center items-center"
        >
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center">
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">Người dùng nói gì về Viet?</motion.h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl">
              <motion.div variants={fadeInUp} className="flex flex-col items-center space-y-2 border rounded-lg p-4 bg-white dark:bg-gray-950">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  width={100}
                  height={100}
                  alt="Avatar"
                  className="rounded-full"
                />
                <h3 className="text-lg font-bold">Nguyễn Văn A</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Giám đốc Công ty XYZ</p>
                <p className="text-sm text-center">"Viet đã giúp chúng tôi tăng hiệu suất làm việc lên 30% trong vòng 3 tháng!"</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex flex-col items-center space-y-2 border rounded-lg p-4 bg-white dark:bg-gray-950">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  width={100}
                  height={100}
                  alt="Avatar"
                  className="rounded-full"
                />
                <h3 className="text-lg font-bold">Trần Thị B</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Nhà nghiên cứu</p>
                <p className="text-sm text-center">"Khả năng tìm kiếm và tổng hợp thông tin của Viet thực sự ấn tượng. Nó đã tiết kiệm cho tôi rất nhiều thời gian."</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex flex-col items-center space-y-2 border rounded-lg p-4 bg-white dark:bg-gray-950">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  width={100}
                  height={100}
                  alt="Avatar"
                  className="rounded-full"
                />
                <h3 className="text-lg font-bold">Lê Văn C</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sinh viên</p>
                <p className="text-sm text-center">"Viet giúp tôi quản lý tài liệu học tập hiệu quả và dễ dàng tìm kiếm thông tin khi cần."</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        </div>
      </main>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t"
      >
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Viet AI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Điều khoản dịch vụ
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Chính sách bảo mật
          </Link>
        </nav>
      </motion.footer>

      <SignInForm isOpen={isOpenSignIn} closeForm={handleToggleSignIn}/>
    </div>
  )
}


