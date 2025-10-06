import { Box, Button, Stack, TextField, Typography, Paper } from "@mui/material";
import { Email, Phone, LocationOn, Send } from "@mui/icons-material";
import { useThemeContext } from "../context/ThemeContext";
import { useTranslation } from "../context/LocaleContext";
import { useState } from "react";
import type { FormEvent } from "react";

export function Contact() {
  const { darkMode } = useThemeContext();
  const { cv, t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/mrbykvzy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = [
    { icon: <Email />, text: cv.personal.email, href: `mailto:${cv.personal.email}` },
    { icon: <Phone />, text: cv.personal.phone, href: `tel:${cv.personal.phone.replace(/\s/g, '')}` },
    { icon: <LocationOn />, text: cv.personal.address }
  ];

  return (
    <Box id="contact" sx={{ py: 8, px: 2, mt: { xs: 4, sm: 6 } }}>
      <Typography variant="h2" 
        sx={{ 
          textAlign: "center", 
          mb: 1,
          fontSize: { xs: "2rem", md: "3rem" },
          fontWeight: 700,
          "& span": {
            color: "primary.main"
          }
        }}>
        Get In <span>Touch</span>
      </Typography>
      
      <Typography variant="body1" 
        sx={{ 
          textAlign: "center", 
          mb: 6,
          color: "text.secondary",
          maxWidth: "600px",
          mx: "auto"
        }}>
        {t("contact.subheading", "Feel free to reach out for collaborations or just a friendly hello")}
      </Typography>

      {submitStatus === 'success' && (
        <Typography
          sx={{
            textAlign: 'center',
            color: 'success.main',
            mb: 2
          }}
        >
          {t("contact.success", "Message sent successfully!")}
        </Typography>
      )}

      {submitStatus === 'error' && (
        <Typography
          sx={{
            textAlign: 'center',
            color: 'error.main',
            mb: 2
          }}
        >
          {t("contact.error", "There was an error sending your message. Please try again.")}
        </Typography>
      )}

      <Paper
        elevation={0}
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
          background: darkMode 
            ? "linear-gradient(45deg, rgba(76, 0, 155, 0.1) 0%, rgba(28, 0, 102, 0.1) 100%)"
            : "linear-gradient(45deg, rgba(124, 58, 237, 0.05) 0%, rgba(97, 0, 255, 0.05) 100%)",
          border: `1px solid ${darkMode ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.1)'}`,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 4
        }}
      >
        <Stack 
          spacing={4}
          sx={{
            p: { xs: 2, sm: 4 },
            bgcolor: darkMode ? 'rgba(124, 58, 237, 0.15)' : 'rgba(124, 58, 237, 0.08)',
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {t("contact.info", "Contact Information")}
          </Typography>
          
          <Stack spacing={3}>
            {contactInfo.map((contact, index) => (
              <Box
                key={index}
                component={contact.href ? "a" : "div"}
                href={contact.href}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  color: darkMode ? "rgba(255, 255, 255, 0.9)" : "text.primary",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  "&:hover": contact.href ? {
                    color: "primary.main",
                    transform: "translateX(8px)"
                  } : {}
                }}
              >
                <Box sx={{ 
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "primary.main",
                  color: "white",
                  display: "flex",
                  boxShadow: "0 4px 20px rgba(124, 58, 237, 0.2)"
                }}>
                  {contact.icon}
                </Box>
                <Typography>{contact.text}</Typography>
              </Box>
            ))}
          </Stack>
        </Stack>

        <Box sx={{ p: { xs: 2, sm: 4 } }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
            {t("contact.form.title", "Send Me a Message")}
          </Typography>
          
          <form onSubmit={handleSubmit} action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
            <Stack spacing={3}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  name="name"
                  label={t("contact.form.name", "Your Name")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(124, 58, 237, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(124, 58, 237, 0.4)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      }
                    }
                  }}
                />
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  label={t("contact.form.email", "Your Email")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(124, 58, 237, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(124, 58, 237, 0.4)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      }
                    }
                  }}
                />
              </Stack>
              
              <TextField
                fullWidth
                name="subject"
                label={t("contact.form.subject", "Subject")}
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(124, 58, 237, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(124, 58, 237, 0.4)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    }
                  }
                }}
              />
              
              <TextField
                fullWidth
                multiline
                rows={4}
                name="message"
                label={t("contact.form.message", "Your Message")}
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(124, 58, 237, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(124, 58, 237, 0.4)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    }
                  }
                }}
              />
              
              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={<Send />}
                disabled={isSubmitting}
                sx={{
                  py: 1.5,
                  bgcolor: "primary.main",
                  color: "white",
                  mt: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "primary.dark",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 20px rgba(124, 58, 237, 0.4)"
                  }
                }}
              >
                {isSubmitting ? t("contact.sending", "Sending...") : t("contact.send", "Send Message")}
              </Button>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}