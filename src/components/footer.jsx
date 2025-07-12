import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-[#1c2b3a] to-slate-800 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#3869EB] rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3869EB] rounded-full blur-3xl translate-x-32 translate-y-32"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 py-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Main Footer Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-12 text-sm">
                        {/* Courzeo Info */}
                        <div className="md:col-span-2">
                            <div className="mb-6">
                                <h3 className="text-[#3869EB] font-bold text-2xl mb-4">
                                    Courzeo
                                </h3>
                                <p className="leading-relaxed text-gray-300 text-base mb-6">
                                    Courzeo is a comprehensive learning platform where ambitious learners discover,
                                    purchase, and master the right courses to accelerate their professional growth
                                    and unlock new opportunities.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-[#3869EB]/20 text-[#3869EB] rounded-full text-xs font-medium">
                                        Online Learning
                                    </span>
                                    <span className="px-3 py-1 bg-[#3869EB]/20 text-[#3869EB] rounded-full text-xs font-medium">
                                        Skill Development
                                    </span>
                                    <span className="px-3 py-1 bg-[#3869EB]/20 text-[#3869EB] rounded-full text-xs font-medium">
                                        Career Growth
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Get in Touch */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-[#3869EB] to-blue-500 rounded-full"></div>
                                Get in Touch
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300 group">
                                    <div className="w-8 h-8 bg-[#3869EB]/20 rounded-lg flex items-center justify-center group-hover:bg-[#3869EB]/30 transition-colors duration-300">
                                        <FaMapMarkerAlt className="text-[#3869EB] text-sm" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                                        Sundhara, Kathmandu Ringroad
                                    </span>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300 group cursor-pointer">
                                    <div className="w-8 h-8 bg-[#3869EB]/20 rounded-lg flex items-center justify-center group-hover:bg-[#3869EB]/30 transition-colors duration-300">
                                        <FaEnvelope className="text-[#3869EB] text-sm" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                                        ourcourzeo@hello.com
                                    </span>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300 group cursor-pointer">
                                    <div className="w-8 h-8 bg-[#3869EB]/20 rounded-lg flex items-center justify-center group-hover:bg-[#3869EB]/30 transition-colors duration-300">
                                        <FaPhone className="text-[#3869EB] text-sm" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                                        +977 9822113345
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-[#3869EB] to-blue-500 rounded-full"></div>
                                Services
                            </h3>
                            <ul className="space-y-3">
                                {["Course Creation", "Course Overview", "Browse Courses", "Secure Payment"].map((item, index) => (
                                    <li key={index} className="group cursor-pointer">
                                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-300">
                                            <div className="w-2 h-2 bg-gray-600 rounded-full group-hover:bg-[#3869EB] transition-colors duration-300"></div>
                                            <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                                                {item}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-[#3869EB] to-blue-500 rounded-full"></div>
                                Company
                            </h3>
                            <ul className="space-y-3">
                                {["About Us", "Features", "Our Team", "Success Stories"].map((item, index) => (
                                    <li key={index} className="group cursor-pointer">
                                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-300">
                                            <div className="w-2 h-2 bg-gray-600 rounded-full group-hover:bg-[#3869EB] transition-colors duration-300"></div>
                                            <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                                                {item}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Social & Connect Section */}
                    <div className="mt-12 pt-8 border-t border-gray-700/50">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div>
                                <h4 className="text-white font-semibold text-lg mb-4">Connect With Us</h4>
                                <div className="flex gap-4">
                                    {[
                                        { icon: FaFacebookF, color: "bg-blue-600 hover:bg-blue-700", label: "Facebook" },
                                        { icon: FaInstagram, color: "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700", label: "Instagram" },
                                        { icon: FaLinkedinIn, color: "bg-blue-500 hover:bg-blue-600", label: "LinkedIn" }
                                    ].map((social, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className={`${social.color} p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
                                            aria-label={social.label}
                                        >
                                            <social.icon className="group-hover:rotate-12 transition-transform duration-300" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="text-center md:text-right">
                                <p className="text-gray-300 text-lg font-medium mb-2">
                                    Thank you for choosing Courzeo
                                </p>
                                <p className="text-[#3869EB] font-semibold">
                                    Empower your learning journey with us
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Copyright */}
                    <div className="mt-8 pt-6 border-t border-gray-700/30 text-center">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Courzeo. All rights reserved.
                            <span className="mx-2">•</span>
                            <a href="#" className="hover:text-[#3869EB] transition-colors duration-300">Privacy Policy</a>
                            <span className="mx-2">•</span>
                            <a href="#" className="hover:text-[#3869EB] transition-colors duration-300">Terms of Service</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
