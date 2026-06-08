import React, { useState } from 'react';
import { 
  Users, Activity, UserCheck, ShieldAlert, Award, Search, Filter, 
  Download, ArrowUpDown, ChevronLeft, ChevronRight, X, Mail, Shield, 
  Trash2, BookOpen, AlertTriangle, CheckCircle, Clock, ExternalLink, Play
} from 'lucide-react';

export default function UserManagement() {
  // State for Users List
  const [users, setUsers] = useState([
    { id: '1', name: 'Ashwin Kumar', email: 'ashwin@gmail.com', role: 'Student', path: 'AI Engineer', subscription: 'Premium', joined: '2026-05-01', lastActive: '2m ago', status: 'Active', avatar: 'AK' },
    { id: '2', name: 'Dr. Elena Volkov', email: 'elena@iconichub.io', role: 'Instructor', path: 'Deep Learning', subscription: 'Custom Enterprise', joined: '2025-10-12', lastActive: '1h ago', status: 'Active', avatar: 'EV' },
    { id: '3', name: 'Sarah Jenkins', email: 'sarah.j@anthropic.com', role: 'Mentor', path: 'NLP Specialist', subscription: 'Premium Partner', joined: '2026-02-15', lastActive: '1d ago', status: 'Active', avatar: 'SJ' },
    { id: '4', name: 'Marcus Chen', email: 'marcus@nvidia.com', role: 'Instructor', path: 'MLOps Architect', subscription: 'Enterprise Partner', joined: '2026-01-20', lastActive: '30m ago', status: 'Active', avatar: 'MC' },
    { id: '5', name: 'Nisha Mehta', email: 'nisha@gmail.com', role: 'Student', path: 'Frontend Developer', subscription: 'Free', joined: '2026-06-02', lastActive: '5m ago', status: 'Pending Verification', avatar: 'NM' },
    { id: '6', name: 'Devon Wright', email: 'devon.w@gmail.com', role: 'Student', path: 'DevOps Engineer', subscription: 'Premium', joined: '2026-04-18', lastActive: '3h ago', status: 'Active', avatar: 'DW' },
    { id: '7', name: 'SpamBot99', email: 'spammer@tempmail.org', role: 'Student', path: 'None Selected', subscription: 'Free', joined: '2026-06-05', lastActive: '10m ago', status: 'Suspended', avatar: 'SB' },
    { id: '8', name: 'Liam Foster', email: 'liam@gmail.com', role: 'Student', path: 'Backend Developer', subscription: 'Free', joined: '2026-03-24', lastActive: '2d ago', status: 'Active', avatar: 'LF' }
  ]);

  // UI Filtering / Sorting / Pagination States
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sortField, setSortField] = useState('joined');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Selected user for Detail Drawer
  const [drawerUser, setDrawerUser] = useState(null);

  // Growth Chart simulation
  const [growthPeriod, setGrowthPeriod] = useState('7d');

  // Handle Selection Checkboxes
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(item => item !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  // Sorting Handler
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  // Dynamic Filtering Logic
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                          user.email.toLowerCase().includes(search.toLowerCase()) || 
                          user.path.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Sort Data
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination bounds
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  // Bulk Actions Handlers
  const handleBulkSuspend = () => {
    setUsers(prev => prev.map(u => selectedUsers.includes(u.id) ? { ...u, status: 'Suspended' } : u));
    setSelectedUsers([]);
  };

  const handleBulkDelete = () => {
    setUsers(prev => prev.filter(u => !selectedUsers.includes(u.id)));
    setSelectedUsers([]);
  };

  // Quick settings updates inside detail drawer
  const updateDrawerUserStatus = (newStatus) => {
    setUsers(prev => prev.map(u => u.id === drawerUser.id ? { ...u, status: newStatus } : u));
    setDrawerUser(prev => ({ ...prev, status: newStatus }));
  };

  const updateDrawerUserRole = (newRole) => {
    setUsers(prev => prev.map(u => u.id === drawerUser.id ? { ...u, role: newRole } : u));
    setDrawerUser(prev => ({ ...prev, role: newRole }));
  };

  // Export Simulation
  const handleExport = (format) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sortedUsers, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `iconic-hub-users.${format}`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 animate-fadeIn text-left relative">
      
      {/* Upper Analytics KPI metrics cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* KPI 1 */}
        <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-xl"></div>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Total Accounts</p>
              <h3 className="text-xl font-extrabold text-white tracking-tight">{users.length}</h3>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-3 font-semibold">Registered database users</p>
        </div>

        {/* KPI 2 */}
        <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full blur-xl"></div>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active Learners</p>
              <h3 className="text-xl font-extrabold text-emerald-400 tracking-tight">
                {users.filter(u => u.status === 'Active').length}
              </h3>
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-emerald-400/80 mt-3 font-semibold">Active in last 24h</p>
        </div>

        {/* KPI 3 */}
        <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-xl"></div>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Pending Verify</p>
              <h3 className="text-xl font-extrabold text-blue-400 tracking-tight">
                {users.filter(u => u.status === 'Pending Verification').length}
              </h3>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-3 font-semibold">Awaiting email auth</p>
        </div>

        {/* KPI 4 */}
        <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-xl"></div>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Premium Tiers</p>
              <h3 className="text-xl font-extrabold text-cyan-400 tracking-tight">
                {users.filter(u => u.subscription !== 'Free').length}
              </h3>
            </div>
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-cyan-400/80 mt-3 font-semibold">Subscribed active users</p>
        </div>

        {/* KPI 5 */}
        <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/5 to-transparent rounded-full blur-xl"></div>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Suspended Accounts</p>
              <h3 className="text-xl font-extrabold text-red-500 tracking-tight">
                {users.filter(u => u.status === 'Suspended').length}
              </h3>
            </div>
            <div className="p-2 bg-red-500/10 rounded-lg text-red-400 border border-red-500/20">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-3 font-semibold">Banned for policy violations</p>
        </div>

      </div>

      {/* Advanced Control Filters bar */}
      <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-900/15 flex flex-col md:flex-row justify-between gap-4">
        
        {/* Search and Dropdown Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search user name, email, path..."
              className="w-full bg-slate-950 border border-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-2.5 pl-11 pr-4 text-xs text-white placeholder-slate-600 outline-none transition-all"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <select 
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
              className="bg-slate-950 border border-slate-900 text-xs text-slate-300 rounded-xl pl-9 pr-8 py-2.5 outline-none focus:border-blue-500 appearance-none cursor-pointer"
            >
              <option value="All">All Roles</option>
              <option value="Student">Students</option>
              <option value="Instructor">Instructors</option>
              <option value="Mentor">Mentors</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <select 
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="bg-slate-950 border border-slate-900 text-xs text-slate-300 rounded-xl pl-9 pr-8 py-2.5 outline-none focus:border-blue-500 appearance-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending Verification">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions & Export options */}
        <div className="flex flex-wrap items-center gap-3">
          {selectedUsers.length > 0 && (
            <div className="flex gap-2 animate-scaleUp">
              <button 
                onClick={handleBulkSuspend}
                className="px-3.5 py-2.5 bg-red-500/10 border border-red-500/20 hover:border-red-500/40 text-red-400 font-bold text-xs rounded-xl transition-all"
              >
                Suspend ({selectedUsers.length})
              </button>
              <button 
                onClick={handleBulkDelete}
                className="px-3.5 py-2.5 bg-red-950 border border-red-900/60 hover:bg-red-900 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleExport('json')}
              className="px-4 py-2.5 bg-slate-950 border border-slate-900 hover:border-slate-800 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export Data
            </button>
          </div>
        </div>

      </div>

      {/* Main Datatable layout */}
      <div className="glass-panel rounded-2xl border border-white/5 bg-slate-950/40 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/40 border-b border-slate-900/60 text-slate-500 uppercase tracking-widest font-extrabold select-none">
                <th className="p-4 w-12 text-center">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={selectedUsers.length === users.length}
                    className="accent-blue-500 w-4 h-4 cursor-pointer"
                  />
                </th>
                <th className="p-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1.5">
                    <span>User</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </div>
                </th>
                <th className="p-4">Role</th>
                <th className="p-4">Learning Path</th>
                <th className="p-4">Subscription</th>
                <th className="p-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('joined')}>
                  <div className="flex items-center gap-1.5">
                    <span>Joined Date</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </div>
                </th>
                <th className="p-4">Last Active</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/50">
              {currentUsers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="p-8 text-center text-slate-500 text-xs">No users match the search conditions.</td>
                </tr>
              ) : (
                currentUsers.map(user => {
                  const isSelected = selectedUsers.includes(user.id);
                  return (
                    <tr 
                      key={user.id} 
                      className={`hover:bg-slate-900/15 transition-colors cursor-pointer ${
                        isSelected ? 'bg-blue-500/[0.02]' : ''
                      }`}
                      onClick={() => setDrawerUser(user)}
                    >
                      {/* Checkbox cell */}
                      <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => handleSelectRow(user.id)}
                          className="accent-blue-500 w-4 h-4 cursor-pointer"
                        />
                      </td>

                      {/* User Avatar + Email details */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 border border-white/5 flex items-center justify-center font-extrabold text-white text-xs shrink-0">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="font-bold text-white">{user.name}</p>
                            <p className="text-[10px] text-slate-500 font-mono mt-0.5">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${
                          user.role === 'Student' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                          user.role === 'Instructor' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                          'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        }`}>
                          {user.role}
                        </span>
                      </td>

                      {/* Path */}
                      <td className="p-4 text-slate-300 font-semibold">{user.path}</td>

                      {/* Subscription */}
                      <td className="p-4">
                        <span className={`text-[10px] font-bold ${
                          user.subscription === 'Free' ? 'text-slate-500' : 'text-cyan-400 flex items-center gap-1'
                        }`}>
                          {user.subscription !== 'Free' && <Award className="w-3 h-3 text-cyan-400 inline" />}
                          {user.subscription}
                        </span>
                      </td>

                      {/* Joined date */}
                      <td className="p-4 text-slate-400 font-mono">{user.joined}</td>

                      {/* Last Active */}
                      <td className="p-4 text-slate-400 font-semibold">{user.lastActive}</td>

                      {/* Status badge */}
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 ${
                          user.status === 'Active' ? 'text-emerald-400' : 
                          user.status === 'Suspended' ? 'text-red-400' : 'text-blue-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            user.status === 'Active' ? 'bg-emerald-500' : 
                            user.status === 'Suspended' ? 'bg-red-500' : 'bg-blue-500 animate-pulse'
                          }`}></span>
                          {user.status}
                        </span>
                      </td>

                      {/* Preview trigger */}
                      <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => setDrawerUser(user)}
                          className="p-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-900/60 bg-slate-950/20 flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing <strong>{indexOfFirstUser + 1}-{Math.min(indexOfLastUser, sortedUsers.length)}</strong> of <strong>{sortedUsers.length}</strong> accounts
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-bold text-white">Page {currentPage} of {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* DETAIL COLLAPSIBLE DRAWER PANEL (Slides in from the right edge) */}
      {drawerUser && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn bg-slate-950/40 backdrop-blur-sm">
          {/* Overlay closer trigger */}
          <div className="flex-1" onClick={() => setDrawerUser(null)}></div>

          {/* Drawer Body container */}
          <div className="w-full max-w-md bg-slate-950 border-l border-slate-900 p-6 flex flex-col justify-between shadow-2xl relative animate-slideLeft h-full overflow-y-auto no-scrollbar">
            
            {/* Drawer Header details */}
            <div className="space-y-6 text-left">
              <div className="flex justify-between items-center pb-4 border-b border-slate-900">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-400">User Profile Sheet</h3>
                <button 
                  onClick={() => setDrawerUser(null)}
                  className="p-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-500 hover:text-white rounded-lg transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Profile card summary info */}
              <div className="flex items-center gap-4 bg-slate-900/20 p-4 rounded-2xl border border-white/5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-extrabold text-white text-base">
                  {drawerUser.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{drawerUser.name}</h4>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">{drawerUser.email}</p>
                </div>
              </div>

              {/* Status and Role quick admin configurations */}
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Administrative Configurations</h5>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Access Status</label>
                    <select 
                      value={drawerUser.status}
                      onChange={(e) => updateDrawerUserStatus(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 appearance-none cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending Verification">Pending Verify</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Assigned Role</label>
                    <select 
                      value={drawerUser.role}
                      onChange={(e) => updateDrawerUserRole(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 appearance-none cursor-pointer"
                    >
                      <option value="Student">Student</option>
                      <option value="Instructor">Instructor</option>
                      <option value="Mentor">Mentor</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Path and Subscription Information */}
              <div className="space-y-3 pt-4 border-t border-slate-900/60">
                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">LMS & Curriculum Status</h5>
                
                <div className="space-y-2 bg-slate-900/10 p-4 rounded-xl border border-slate-900">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Learning Path</span>
                    <span className="font-bold text-white">{drawerUser.path}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Subscription Tier</span>
                    <span className="font-bold text-cyan-400">{drawerUser.subscription}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Registered Date</span>
                    <span className="font-bold text-slate-400 font-mono">{drawerUser.joined}</span>
                  </div>
                </div>
              </div>

              {/* Active Activity Feed details */}
              <div className="space-y-3">
                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recent Account logs</h5>
                
                <div className="space-y-3">
                  <div className="flex gap-3 text-xs">
                    <Clock className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-300 font-semibold">Logged in via Chrome macOS</p>
                      <span className="text-[10px] text-slate-600 font-bold">{drawerUser.lastActive}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 text-xs">
                    <BookOpen className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-300 font-semibold">Completed coding challenge: vector embeddings</p>
                      <span className="text-[10px] text-slate-600 font-bold">1d ago</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick action buttons footer */}
            <div className="pt-6 border-t border-slate-900 flex gap-3 text-xs font-bold mt-8">
              <button className="flex-1 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition-all flex items-center justify-center gap-1.5">
                <Mail className="w-4 h-4" /> Message User
              </button>
              <button 
                onClick={() => setUsers(prev => prev.filter(u => u.id !== drawerUser.id))}
                className="px-4 py-3 bg-red-500/10 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-xl transition-all"
                title="Permanently Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
