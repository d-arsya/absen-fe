// ProfilePage.tsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getDistance } from "geolib";

interface UserProfile {
  nama: string;
  email: string;
  peran: string;
}
interface Geolocation {
  latitude: number;
  longitude: number;
}

function getUserDistance(position: Geolocation) {
  return getDistance(position, {
    latitude: -7.531019289655964,
    longitude: 110.83636753840491,
  });
}

const ProfilePage: React.FC = () => {
  const data = useSelector((state: any) => state.data.data);
  const router = useRouter();
  const user: UserProfile = data;
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [error, setError] = useState("");
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setDistance(getUserDistance(location));
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation not supported by your browser.");
    }
  }, []);
  useEffect(() => {
    const cekProfil = async () => {
      if (typeof data === "undefined" || typeof data.nama === "undefined") {
        router.push("/");
      }
    };
    cekProfil();
  }, [data]);

  return (
    <Layout>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>
            Profil
          </Typography>
          <Typography variant="body1">
            <strong>Nama:</strong> {user.nama}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1">
            <strong>Peran:</strong> {user.peran}
          </Typography>

          <Typography variant="h6" sx={{ marginTop: 4 }}>
            Lokasi Saat Ini
          </Typography>
          {location.latitude && location.longitude ? (
            <Typography variant="body1">
              <strong>Latitude:</strong> {location.latitude}
              <br />
              <strong>Longitude:</strong> {location.longitude}
              <br />
              <strong>Jarak dari rumah:</strong> {distance} m
            </Typography>
          ) : error ? (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          ) : (
            <Typography variant="body1">Mengambil lokasi...</Typography>
          )}
        </Paper>
      </Container>
    </Layout>
  );
};
export default ProfilePage;
