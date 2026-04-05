# Appwrite Setup Guide for Connekt Studio

## 🚀 APPWRITE DATABASE SETUP

### **Step 1: Create Appwrite Account**
1. Go to [https://cloud.appwrite.io](https://cloud.appwrite.io)
2. Create a free account
3. Create a new project called "Connekt Studio"

### **Step 2: Get Your Credentials**
1. In your project dashboard, go to **Settings > API Keys**
2. Create a new API key with these permissions:
   - `documents.read`
   - `documents.write`
   - `documents.delete`
   - `collections.read`
   - `collections.write`
3. Copy your **Project ID** and **API Key**

### **Step 3: Update Configuration**
Update your `script.js` file with your actual credentials:

```javascript
// Replace these with your actual Appwrite credentials
const client = new Appwrite.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Keep this as is
    .setProject('YOUR_ACTUAL_PROJECT_ID'); // Replace with your Project ID
```

### **Step 4: Create Database & Collections**

#### **Create Database**
1. In Appwrite dashboard, go to **Databases**
2. Click **Create Database**
3. Name: `connekt_studio`
4. Database ID: `connekt_studio`

#### **Create Collections**

**Classes Collection:**
- Collection ID: `classes`
- Attributes:
  - `name` (String, Required)
  - `description` (String)
  - `duration` (String)
  - `price` (Number, Required)
  - `level` (String, Required)
  - `schedule` (String)
  - `instructor` (String)
  - `image_url` (String)
  - `features` (Array)
  - `status` (String, Default: "active")
  - `created_by` (String)
  - `created_at` (DateTime)
  - `updated_at` (DateTime)

**Customers Collection:**
- Collection ID: `customers`
- Attributes:
  - `name` (String, Required)
  - `email` (String, Required, Unique)
  - `phone` (String)
  - `registration_date` (Date)
  - `status` (String, Default: "active")
  - `created_at` (DateTime)

**Enrollments Collection:**
- Collection ID: `enrollments`
- Attributes:
  - `customer_id` (String, Required)
  - `class_id` (String, Required)
  - `enrollment_date` (Date, Required)
  - `amount_paid` (Number)
  - `payment_status` (String, Default: "pending")
  - `status` (String, Default: "active")
  - `created_at` (DateTime)

**Users Collection:**
- Collection ID: `users`
- Attributes:
  - `name` (String, Required)
  - `email` (String, Required, Unique)
  - `password_hash` (String, Required)
  - `role` (String, Default: "admin")
  - `status` (String, Default: "active")
  - `permissions` (Array)
  - `created_at` (DateTime)
  - `last_login` (DateTime)

**Settings Collection:**
- Collection ID: `settings`
- Attributes:
  - `key_name` (String, Required, Unique)
  - `value` (String)
  - `description` (String)
  - `updated_by` (String)
  - `updated_at` (DateTime)

**Audit Logs Collection:**
- Collection ID: `audit_logs`
- Attributes:
  - `user_id` (String, Required)
  - `action` (String, Required)
  - `table_name` (String)
  - `record_id` (String)
  - `old_data` (Object)
  - `new_data` (Object)
  - `ip_address` (String)
  - `user_agent` (String)
  - `created_at` (DateTime)

### **Step 5: Set Permissions**
For each collection, set these permissions:

**Classes Collection:**
- Read: `any` (public access)
- Write: `role:admin` (admin only)
- Delete: `role:admin` (admin only)

**Customers Collection:**
- Read: `role:admin`
- Write: `role:admin`
- Delete: `role:admin`

**Enrollments Collection:**
- Read: `role:admin`
- Write: `role:admin`
- Delete: `role:admin`

**Users Collection:**
- Read: `role:owner`
- Write: `role:owner`
- Delete: `role:owner`

**Settings Collection:**
- Read: `role:admin`
- Write: `role:owner`
- Delete: `role:owner`

**Audit Logs Collection:**
- Read: `role:owner`
- Write: `role:admin`
- Delete: `role:owner`

### **Step 6: Test the Integration**
1. Open your website
2. Click **"Check Admin Data"** button
3. Should see connection to Appwrite
4. Click **"Add Test Class"** button
5. Should see test class appear

## 🎯 BENEFITS OF APPWRITE INTEGRATION

### **✅ Professional Features:**
- **Real-time Updates:** Classes appear instantly when admin adds them
- **Automatic Sync:** No more manual refresh needed
- **Data Security:** Professional authentication and permissions
- **Scalability:** Handle thousands of users and classes
- **Backup:** Automatic data backup and recovery
- **Analytics:** Built-in usage statistics and monitoring

### **🔒 Security Features:**
- **Role-based Access:** Owner, Admin, Moderator roles
- **API Key Security:** Secure API access
- **Data Validation:** Automatic data type checking
- **Audit Trail:** Track all changes made by users

### **📱 Cross-Platform:**
- **Web:** Your current website
- **Mobile:** Future mobile app support
- **Admin Panel:** Enhanced admin dashboard
- **API:** RESTful API for integrations

## 🚀 NEXT STEPS

### **1. Update Admin Panel**
- Modify `admin-dashboard.html` to use Appwrite
- Add real-time updates to admin interface
- Implement proper authentication

### **2. Create Owner Dashboard**
- Build comprehensive owner dashboard
- Add user management features
- Include analytics and reporting

### **3. Add Advanced Features**
- Real-time notifications
- Advanced search and filtering
- Data export functionality
- Automated backups

## 🛠️ TROUBLESHOOTING

### **Common Issues:**

**"Appwrite initialization failed"**
- Check your Project ID is correct
- Verify API key has proper permissions
- Check database and collections exist

**"No classes found in Appwrite"**
- Create some test classes in Appwrite dashboard
- Check collection permissions
- Verify database ID matches

**"Real-time updates not working"**
- Check browser console for errors
- Verify subscription permissions
- Check network connectivity

### **Debug Tools:**
- Use browser console (F12) to see logs
- Check Appwrite dashboard for API usage
- Use network tab to see API calls
- Test with "Check Admin Data" button

## 📞 SUPPORT

If you need help:
1. Check Appwrite documentation: https://appwrite.io/docs
2. Review console logs for errors
3. Verify all setup steps are completed
4. Test with sample data first

Your Appwrite integration is now ready! 🎉
