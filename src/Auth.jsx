
import { useState } from 'react';
import { supabase } from './lib/supabase';

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name }
          }
        });

        if (error) throw error;

        if (data.session) {
          onLogin(data.session.user);
        } else {
          setMessage(
            'Pendaftaran berhasil. Periksa email untuk verifikasi sebelum login.'
          );
          setMode('login');
        }
      } else {
        const { data, error } =
          await supabase.auth.signInWithPassword({
            email,
            password
          });

        if (error) throw error;
        onLogin(data.user);
      }
    } catch (error) {
      setMessage(error.message || 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <div style={styles.icon}>ب</div>
        <h1 style={styles.title}>Balaghah Builder</h1>
        <p style={styles.subtitle}>
          Platform Pembelajaran Ilmu Ma’ani
        </p>

        <div style={styles.tabs}>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setMessage('');
            }}
            style={{
              ...styles.tab,
              ...(mode === 'login' ? styles.activeTab : {})
            }}
          >
            Masuk
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setMessage('');
            }}
            style={{
              ...styles.tab,
              ...(mode === 'signup' ? styles.activeTab : {})
            }}
          >
            Daftar Siswa
          </button>
        </div>

        {mode === 'signup' && (
          <label style={styles.label}>
            Nama lengkap
            <input
              style={styles.input}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              required
              autoComplete="name"
            />
          </label>
        )}

        <label style={styles.label}>
          Email
          <input
            style={styles.input}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="nama@email.com"
            required
            autoComplete="email"
          />
        </label>

        <label style={styles.label}>
          Kata sandi
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            minLength={8}
            required
            autoComplete={
              mode === 'login' ? 'current-password' : 'new-password'
            }
          />
        </label>

        {message && (
          <p role="status" style={styles.message}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={styles.submit}
        >
          {loading
            ? 'Memproses...'
            : mode === 'login'
              ? 'Masuk ke Akun'
              : 'Buat Akun Siswa'}
        </button>

        <p style={styles.note}>
          Akun guru diberikan secara khusus oleh administrator.
        </p>
      </form>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    boxSizing: 'border-box',
    background: '#f5f3ed',
    fontFamily: 'Arial, sans-serif'
  },
  card: {
    width: '100%',
    maxWidth: 420,
    padding: 30,
    boxSizing: 'border-box',
    borderRadius: 20,
    background: '#fff',
    boxShadow: '0 12px 40px rgba(0,0,0,0.08)'
  },
  icon: {
    width: 52,
    height: 52,
    display: 'grid',
    placeItems: 'center',
    borderRadius: 14,
    background: '#153c35',
    color: '#fff',
    fontSize: 30,
    marginBottom: 18
  },
  title: {
    margin: '0 0 8px',
    color: '#153c35',
    fontSize: 27
  },
  subtitle: {
    color: '#66736d',
    marginBottom: 24
  },
  tabs: {
    display: 'flex',
    gap: 8,
    marginBottom: 22
  },
  tab: {
    flex: 1,
    padding: 12,
    border: '1px solid #dce3de',
    borderRadius: 9,
    background: '#fff',
    cursor: 'pointer'
  },
  activeTab: {
    background: '#153c35',
    color: '#fff',
    borderColor: '#153c35'
  },
  label: {
    display: 'block',
    marginBottom: 16,
    color: '#273b34',
    fontSize: 14,
    fontWeight: 600
  },
  input: {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    padding: 13,
    marginTop: 8,
    border: '1px solid #dce3de',
    borderRadius: 9,
    fontSize: 15
  },
  message: {
    padding: 12,
    borderRadius: 8,
    background: '#f5f3ed',
    color: '#153c35',
    fontSize: 14,
    overflowWrap: 'anywhere'
  },
  submit: {
    width: '100%',
    padding: 14,
    marginTop: 8,
    border: 0,
    borderRadius: 9,
    background: '#153c35',
    color: '#fff',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer'
  },
  note: {
    marginTop: 20,
    color: '#66736d',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 1.6
  }
};
