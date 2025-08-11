"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Shield, 
  Users, 
  BarChart3, 
  CheckCircle, 
  ArrowRight,
  Star,
  Globe,
  Calculator,
  FileText,
  Clock,
  Award
} from "lucide-react";

const AccountingHero = () => {
  const [currentStat, setCurrentStat] = useState(0);
  
  const stats = [
    { number: "50,000+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "$2.3B", label: "Transactions Processed" },
    { number: "150+", label: "Countries" }
  ];

  const features = [
    "Real-time financial reporting",
    "Automated invoicing & payments", 
    "Tax compliance automation",
    "Multi-currency support"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-100 rounded-full opacity-40 transform translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-100 rounded-full opacity-30 transform -translate-x-32 translate-y-32"></div>
      </div>

      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Navigation */}
      <motion.nav 
        className="relative z-50 flex justify-between items-center px-6 lg:px-12 py-6 bg-white/80 backdrop-blur-sm border-b border-gray-200/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900">FinanceFlow</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-slate-900 transition-colors font-medium">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-slate-900 transition-colors font-medium">Pricing</a>
          <a href="#about" className="text-gray-600 hover:text-slate-900 transition-colors font-medium">About</a>
          <Link href="/dashboard" className="bg-violet-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-violet-700 transition-colors">
            Sign In
          </Link>
        </div>
      </motion.nav>

      {/* Main Hero Content */}
      <div className="relative z-40 max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center space-x-2 bg-slate-100 rounded-full px-4 py-2 text-slate-700"
            >
              <Award className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium">Trusted by Fortune 500 companies</span>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Enterprise Accounting
              <span className="text-slate-600 block">
                Platform
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Streamline financial operations with enterprise-grade tools. 
              Advanced reporting, automated compliance, and seamless integrations 
              for growing businesses.
            </motion.p>

            {/* Feature List */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Link href="/dashboard" className="bg-violet-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-violet-700 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link href="/demo" className="border-2 border-violet-200 text-violet-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-violet-300 hover:bg-violet-50 transition-all duration-200">
                Schedule Demo
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-wrap items-center gap-6 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-slate-600" />
                <span className="text-gray-600 text-sm font-medium">SOC 2 Type II</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-slate-600" />
                <span className="text-gray-600 text-sm font-medium">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-1">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
                <span className="text-gray-600 text-sm font-medium ml-2">4.9/5 Rating</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Main Dashboard Card */}
            <div className="relative z-20 bg-white rounded-2xl p-8 shadow-2xl border border-gray-200">
              {/* Dashboard Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-slate-900 font-semibold text-xl">Dashboard</h3>
                  <p className="text-gray-500 text-sm">Financial Overview</p>
                </div>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <motion.div 
                  key={currentStat}
                  className="bg-gray-50 rounded-xl p-5 border border-gray-100"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl font-bold text-slate-900 mb-1">{stats[currentStat].number}</div>
                  <div className="text-gray-500 text-sm font-medium">{stats[currentStat].label}</div>
                </motion.div>
                
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-600 text-sm font-semibold">+18.2%</span>
                  </div>
                  <div className="text-slate-900 font-semibold">Revenue Growth</div>
                  <div className="text-gray-500 text-xs">vs. last quarter</div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-slate-900 font-semibold">Monthly Revenue</span>
                    <p className="text-gray-500 text-sm">Last 7 months</p>
                  </div>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div className="h-20 flex items-end space-x-3">
                  {[60, 75, 55, 85, 70, 95, 80].map((height, index) => (
                    <motion.div
                      key={index}
                      className="bg-violet-600 rounded-t-sm flex-1"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                    />
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-4">
                <h4 className="text-slate-900 font-semibold">Recent Activity</h4>
                {[
                  { icon: FileText, text: "Invoice #INV-2024-0847 processed", amount: "$12,450", time: "5 min ago" },
                  { icon: Users, text: "New client account created", amount: "", time: "1 hour ago" },
                  { icon: Clock, text: "Monthly tax report generated", amount: "", time: "2 hours ago" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-slate-600" />
                      </div>
                      <div>
                        <span className="text-slate-900 text-sm font-medium block">{item.text}</span>
                        <span className="text-gray-500 text-xs">{item.time}</span>
                      </div>
                    </div>
                    {item.amount && (
                      <span className="text-slate-900 font-semibold">{item.amount}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Accent Elements */}
            <motion.div
              className="absolute -top-6 -right-6 bg-slate-900 rounded-xl p-4 shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Shield className="w-6 h-6 text-white" />
            </motion.div>

            <motion.div
              className="absolute -bottom-8 -left-8 bg-white rounded-xl p-4 shadow-lg border border-gray-200"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <TrendingUp className="w-6 h-6 text-slate-900" />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-2">500ms</div>
            <div className="text-gray-600 text-sm font-medium">Average Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-2">24/7</div>
            <div className="text-gray-600 text-sm font-medium">Customer Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-2">99.9%</div>
            <div className="text-gray-600 text-sm font-medium">Data Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-2">15+</div>
            <div className="text-gray-600 text-sm font-medium">Years Experience</div>
          </div>
        </motion.div>
      </div>

      {/* Trusted By Section */}
      <motion.div
        className="relative z-40 bg-white border-t border-gray-200 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-center text-gray-500 text-sm font-medium mb-8">TRUSTED BY LEADING ORGANIZATIONS</p>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            {['Microsoft', 'Salesforce', 'Adobe', 'Shopify', 'Stripe'].map((company, index) => (
              <div key={index} className="text-slate-700 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccountingHero;