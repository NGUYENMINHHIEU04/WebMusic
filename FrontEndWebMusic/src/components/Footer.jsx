import React from "react";
import { FaFacebook, FaInstagram , FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-bold mb-3">Công ty</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-green-500">Giới thiệu</a></li>
            <li><a href="#" className="hover:text-green-500">Việc làm</a></li>
            <li><a href="#" className="hover:text-green-500">For the Record</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Cộng đồng</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-green-500">Dành cho các Nghệ sĩ</a></li>
            <li><a href="#" className="hover:text-green-500">Nhà phát triển</a></li>
            <li><a href="#" className="hover:text-green-500">Quảng cáo</a></li>
            <li><a href="#" className="hover:text-green-500">Nhà đầu tư</a></li>
            <li><a href="#" className="hover:text-green-500">Nhà cung cấp</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Liên kết hữu ích</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-green-500">Hỗ trợ</a></li>
            <li><a href="#" className="hover:text-green-500">Ứng dụng Di động Miễn phí</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Các gói của Spotify</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-green-500">Premium Individual</a></li>
            <li><a href="#" className="hover:text-green-500">Premium Student</a></li>
            <li><a href="#" className="hover:text-green-500">Spotify Free</a></li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10 border-t border-gray-700 pt-5">
        <div className="text-gray-400 text-sm space-x-4">
          <a href="#" className="hover:text-green-500">Pháp lý</a>
          <a href="#" className="hover:text-green-500">Trung tâm an toàn và quyền riêng tư</a>
          <a href="#" className="hover:text-green-500">Chính sách quyền riêng tư</a>
          <a href="#" className="hover:text-green-500">Cookie</a>
          <a href="#" className="hover:text-green-500">Giới thiệu Quảng cáo</a>
          <a href="#" className="hover:text-green-500">Hỗ trợ tiếp cận</a>
          <a className="">© 2025 Spotify LMH</a>
        </div>


        <div className="flex space-x-4">
          <FaFacebook className="text-gray-400 text-xl hover:text-green-500"/>
          <FaInstagram className="text-gray-400 text-xl hover:text-green-500"/>
          <FaTwitter className="text-gray-400 text-xl hover:text-green-500"/>
        </div>
      </div>
    </footer>
  );
}
