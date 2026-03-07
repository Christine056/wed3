import React, { useState, useEffect, useCallback } from 'react';
import AdminNavbar from '../../Components/Admin/AdminNavbar';
import { getAllGuests, addGuest, updateGuest, deleteGuest } from '../../Helpers/API/AdminApi';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { Modal } from 'antd';

const EMPTY_FORM = { name: '', password: '', reserved_seats: 1, children_count: 0, plus_one_count: 0 };

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const loadGuests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllGuests(filter);
      setGuests(res.data || []);
    } catch { toast.error('Failed to load guests.'); }
    finally { setLoading(false); }
  }, [filter]);

  useEffect(() => { loadGuests(); }, [loadGuests]);

  const handleOpen = (guest = null) => {
    setEditing(guest);
    setForm(guest ? { ...guest } : EMPTY_FORM);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.password) { toast.error('Name and password are required.'); return; }
    setSaving(true);
    try {
      const res = editing ? await updateGuest({ ...form, id: editing.id }) : await addGuest(form);
      if (res.data || res.message) {
        toast.success(editing ? 'Guest updated!' : 'Guest added!');
        setModalOpen(false);
        loadGuests();
      } else {
        toast.error(res.messages?.error_messages?.[0] || 'Operation failed.');
      }
    } catch { toast.error('Operation failed.'); }
    finally { setSaving(false); }
  };

  const handleDelete = (guest) => {
    Modal.confirm({
      title: `Remove ${guest.name}?`,
      content: 'This will soft-delete the guest record.',
      okText: 'Delete',
      okButtonProps: { style: { background: '#f85149', borderColor: '#f85149' } },
      onOk: async () => {
        try {
          await deleteGuest(guest.id);
          toast.success('Guest removed.');
          loadGuests();
        } catch { toast.error('Delete failed.'); }
      },
    });
  };

  const filtered = guests.filter(g => g.name?.toLowerCase().includes(search.toLowerCase()));

  const statusBadge = (guest) => {
    if (guest.is_attending === null || guest.is_attending === undefined || guest.is_attending === '') {
      return <span style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', padding: '2px 10px', borderRadius: '20px', fontSize: '0.75rem', fontFamily: "'Cormorant Garamond',serif", letterSpacing: '1px' }}>PENDING</span>;
    }
    if (parseInt(guest.is_attending) === 1) {
      return <span style={{ background: 'rgba(46,160,67,0.15)', color: '#2ea043', padding: '2px 10px', borderRadius: '20px', fontSize: '0.75rem', fontFamily: "'Cormorant Garamond',serif", letterSpacing: '1px' }}>ATTENDING</span>;
    }
    return <span style={{ background: 'rgba(248,81,73,0.15)', color: '#f85149', padding: '2px 10px', borderRadius: '20px', fontSize: '0.75rem', fontFamily: "'Cormorant Garamond',serif", letterSpacing: '1px' }}>DECLINED</span>;
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.3)',
    borderRadius: '2px', padding: '10px 14px', color: '#fff',
    fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem',
    outline: 'none', width: '100%',
  };
  const labelStyle = { fontFamily: "'Cormorant Garamond', serif", color: '#C9A84C', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' };

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a' }}>
      <AdminNavbar />
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#C9A84C', margin: 0 }}>Guest List</h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.4)', margin: 0 }}>{guests.length} guests total</p>
          </div>
          <button onClick={() => handleOpen()} style={{
            background: 'linear-gradient(135deg, #C9A84C, #FFD700)', color: '#1a1a1a',
            border: 'none', borderRadius: '2px', padding: '10px 24px', cursor: 'pointer',
            fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem',
            letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '700',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <FaPlus size={12} /> Add Guest
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
            <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(201,168,76,0.5)', fontSize: '13px' }} />
            <input
              type="text" placeholder="Search guests..." value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: '36px' }}
            />
          </div>
          {['', 'attending', 'declined', 'pending'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? 'linear-gradient(135deg,#C9A84C,#FFD700)' : 'transparent',
              color: filter === f ? '#1a1a1a' : '#C9A84C',
              border: '1px solid rgba(201,168,76,0.4)', borderRadius: '2px',
              padding: '8px 18px', cursor: 'pointer',
              fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem',
              letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: filter === f ? '700' : '400',
            }}>
              {f || 'All'}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#242424', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.05)' }}>
                  {['Guest Name', 'Password', 'Seats', 'Children', '+1', 'Status', 'Message', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontFamily: "'Cormorant Garamond', serif", color: '#C9A84C', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={8} style={{ textAlign: 'center', padding: '3rem', fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.4)' }}>Loading...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={8} style={{ textAlign: 'center', padding: '3rem', fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>No guests found</td></tr>
                ) : filtered.map((g, i) => (
                  <tr key={g.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '14px 16px', fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '1rem' }}>{g.name}</td>
                    <td style={{ padding: '14px 16px', fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', letterSpacing: '2px' }}>{g.password}</td>
                    <td style={{ padding: '14px 16px', fontFamily: "'Cormorant Garamond', serif", color: '#fff', textAlign: 'center' }}>{g.reserved_seats}</td>
                    <td style={{ padding: '14px 16px', fontFamily: "'Cormorant Garamond', serif", color: '#fff', textAlign: 'center' }}>{g.children_count || 0}</td>
                    <td style={{ padding: '14px 16px', fontFamily: "'Cormorant Garamond', serif", color: '#fff', textAlign: 'center' }}>{g.plus_one_count || 0}</td>
                    <td style={{ padding: '14px 16px' }}>{statusBadge(g)}</td>
                    <td style={{ padding: '14px 16px', fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.message || '—'}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleOpen(g)} style={{ background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C', padding: '6px 10px', cursor: 'pointer', borderRadius: '2px' }}>
                          <FaEdit size={12} />
                        </button>
                        <button onClick={() => handleDelete(g)} style={{ background: 'transparent', border: '1px solid rgba(248,81,73,0.3)', color: '#f85149', padding: '6px 10px', cursor: 'pointer', borderRadius: '2px' }}>
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        title={null}
        styles={{ content: { background: '#242424', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '4px', padding: 0 } }}
      >
        <div style={{ padding: '2rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#C9A84C', marginBottom: '2rem' }}>
            {editing ? 'Edit Guest' : 'Add Guest'}
          </h2>
          {[
            { field: 'name', label: 'Full Name', type: 'text' },
            { field: 'password', label: 'Guest Code / Password', type: 'text' },
            { field: 'reserved_seats', label: 'Reserved Seats', type: 'number' },
            { field: 'children_count', label: 'Children Count', type: 'number' },
            { field: 'plus_one_count', label: 'Plus One', type: 'number' },
          ].map(({ field, label, type }) => (
            <div key={field} style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>{label}</label>
              <input
                type={type} value={form[field] ?? ''} min={type === 'number' ? 0 : undefined}
                onChange={e => setForm({ ...form, [field]: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#C9A84C'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.3)'}
              />
            </div>
          ))}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button onClick={handleSave} disabled={saving} style={{
              flex: 1, background: 'linear-gradient(135deg, #C9A84C, #FFD700)', color: '#1a1a1a',
              border: 'none', borderRadius: '2px', padding: '12px',
              fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem',
              letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '700', cursor: 'pointer',
            }}>
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => setModalOpen(false)} style={{
              flex: 1, background: 'transparent', border: '1px solid rgba(201,168,76,0.3)',
              color: 'rgba(255,255,255,0.6)', borderRadius: '2px', padding: '12px',
              fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem',
              letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer',
            }}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GuestList;
