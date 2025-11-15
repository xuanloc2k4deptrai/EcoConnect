# 🏢 EcoConnect - Business Features Guide

## 🔐 Demo Accounts

Hệ thống có 2 tài khoản demo để test:

### 👤 **Consumer Account (Người dùng)**
- **Email:** `demo@ecoconnect.vn`
- **Password:** `demo123`
- **Features:** Marketplace, QR Scanning, Carbon Wallet, Challenges

### 🏢 **Business Account (Doanh nghiệp)**
- **Email:** `business@ecoconnect.vn`
- **Password:** `business123`
- **Company:** Green Shop Vietnam
- **Features:** Full business dashboard & management tools

---

## 📊 Business Features Overview

### 1. **Dashboard** (`/business/dashboard`)
Trang tổng quan với các metrics quan trọng:
- 💰 Revenue tracking với growth rate
- 📦 Orders management
- 🏆 Top products performance
- ⚡ Quick actions

### 2. **Product Management** (`/business/products`)
Quản lý sản phẩm toàn diện:
- 📊 Statistics cards (Total, In stock, Blockchain verified, Avg rating)
- 🔍 Filters: All/Active/Draft
- ✏️ Edit, Delete, View passport, View on marketplace
- ➕ Create new product

### 3. **Create/Edit Product** (`/business/products/new`)
Form tạo sản phẩm với đầy đủ thông tin:
- 📝 Basic info: Name, description, category, price, stock, images
- 🌱 ESG Score sliders (Environmental, Social, Governance)
- 🌍 Carbon Footprint breakdown
- ✅ 9 types of certifications
- 🔖 Green features checkboxes
- 🔗 Optional NFT passport creation

### 4. **Order Management** (`/business/orders`)
Theo dõi và xử lý đơn hàng:
- 📊 6 statistics cards
- 🔍 Search & filter by status
- 👤 Customer information
- 📦 Order items with images
- ⚡ Quick status updates: Confirm → Package → Ship → Complete
- 🔔 Detailed modal with timeline

### 5. **Advanced Analytics** (`/business/analytics`)
Phân tích chi tiết:
- 💰 Revenue chart (Week/Month/Quarter/Year)
- 📦 Orders tracking
- 🎯 Category performance breakdown
- 📈 ESG trend over 6 months
- 🏆 Top 5 products with growth rate
- 👥 Customer segmentation (New/Loyal/VIP)
- 📤 Export options (PDF, Excel, Email)

### 6. **Review Management** (`/business/reviews`)
Quản lý đánh giá khách hàng:
- ⭐ Overall statistics (Total, Average, New, Needs attention)
- 📊 Rating distribution chart (5→1 stars)
- 🔍 Filters: All/New/Replied/Low-rating
- 💬 Reply interface
- 🖼️ Support for customer images
- 🏢 Shop reply UI
- 🚫 Hide inappropriate reviews

### 7. **Notifications** (`/business/notifications`)
Theo dõi hoạt động:
- 🔔 Real-time notifications
- 📊 Stats: Total, Unread, High priority, New orders
- 🎯 Filter by type: Order/Review/Stock/System/ESG
- ⚡ Priority levels: Low/Medium/High
- ✓ Mark as read/Delete actions
- 🔗 Quick links to relevant pages

---

## 🎨 UI/UX Features

### Navigation
- **Adaptive menu** based on user type
- **Business menu items:**
  - 📊 Dashboard
  - 📦 Sản phẩm
  - 📋 Đơn hàng
  - ⭐ Đánh giá
  - 📈 Phân tích
  - 🌱 ESG
  - 🔗 Hộ chiếu

### Components
- **Cards** with shadow & hover effects
- **Badges** for status indicators
- **Charts** with animations
- **Modals** for detailed views
- **Loading states** for better UX
- **Error handling** with clear messages

### Color Coding
- 🔵 **Blue**: Orders, Information
- 🟢 **Green**: Success, Completed, ESG
- 🟡 **Yellow**: Warnings, Reviews
- 🔴 **Red**: Errors, High priority, Low stock
- 🟣 **Purple**: Analytics, Processing

---

## 🚀 Quick Start

### 1. Login as Business
```
1. Go to /login
2. Click "🏢 Đăng nhập Demo Doanh nghiệp"
3. Credentials auto-filled
4. Click "Đăng nhập"
5. Redirected to /business/dashboard
```

### 2. Navigate Features
```
Use the top navigation:
- Dashboard: Overview of all metrics
- Sản phẩm: Manage products
- Đơn hàng: Process orders
- Đánh giá: Respond to reviews
- Phân tích: View detailed analytics
```

### 3. Quick Actions
```
From Dashboard:
- "Thêm sản phẩm" → Create new product
- "Quản lý đơn hàng" → View all orders
- "Phân tích chi tiết" → View analytics
- "Quản lý đánh giá" → Manage reviews
```

### 4. Switch User Types
```
1. Click user avatar (top right)
2. Click "Đăng xuất"
3. Login with different account:
   - Consumer: demo@ecoconnect.vn
   - Business: business@ecoconnect.vn
```

---

## 📱 Mobile Responsive

All business pages are fully responsive:
- ✅ Mobile navigation menu
- ✅ Touch-friendly buttons
- ✅ Scrollable tables
- ✅ Stacked layouts on small screens
- ✅ Optimized charts for mobile

---

## 🔒 Authentication

### Protected Routes
All business routes require:
1. **Authentication**: User must be logged in
2. **Authorization**: User type must be 'business'

### Access Control
```typescript
if (!user) {
  router.push('/login');
  return <LoadingSpinner />;
}

if (user.userType !== 'business') {
  return <AccessDenied />;
}
```

---

## 📊 Mock Data

All features use realistic mock data for development:
- **Products**: 3 sample products with blockchain verification
- **Orders**: 5 sample orders with different statuses
- **Reviews**: 5 sample reviews with ratings and images
- **Analytics**: Revenue/orders data for week/month/quarter/year
- **Notifications**: 8 sample notifications with different types

---

## 🎯 Next Steps

### Future Enhancements
- [ ] Real API integration
- [ ] Real-time updates with WebSocket
- [ ] Advanced filtering & sorting
- [ ] Bulk operations
- [ ] Export to CSV/Excel
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Dark mode

### Backend Integration
```typescript
// Replace mock data with API calls:
const fetchProducts = async () => {
  const response = await fetch('/api/business/products');
  return response.json();
};

const updateOrder = async (id: string, status: string) => {
  const response = await fetch(`/api/business/orders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
  return response.json();
};
```

---

## 💡 Tips & Tricks

1. **Fast Navigation**: Use Ctrl+Click to open links in new tab
2. **Keyboard Shortcuts**: Tab through forms, Enter to submit
3. **Filter Persistence**: Filters saved in URL params (coming soon)
4. **Batch Actions**: Select multiple items for bulk operations (coming soon)
5. **Search**: Use Ctrl+K for global search (coming soon)

---

## 🐛 Known Issues

None currently! 🎉

---

## 📞 Support

For questions or issues:
- 📧 Email: support@ecoconnect.vn
- 💬 Chat: Available in app (coming soon)
- 📚 Docs: https://docs.ecoconnect.vn

---

**Last Updated:** January 15, 2024  
**Version:** 1.0.0  
**Developed by:** EcoConnect Team
