import { MusicNote, Edit, CreditCard,  HelpCenter,Lock, SelfImprovement, PrivacyTip } from '@mui/icons-material';
import { Box,  Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'

const Account = () => {
    return (
        <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }} zIndex={0}>
      <Box sx={{ maxWidth: 600, margin: "auto",display:"flex"}} >
            <Card sx={{ minWidth: 450 ,mb: 2, display: "flex", alignItems: "center", mr: { md: 3 } }}>
            <Box sx={{ml: 8}} >   
          <Typography variant="h6">Your Plan</Typography>
          <Typography variant="h4" fontWeight="bold">Groovity Commoners</Typography>
            </Box>
        </Card>

          <Card sx={{ mb: 2, p: 2, ":hover": { background: "linear-gradient(45deg, #7f00ff, #e100ff)" } }}>
            <Typography variant="h6" color="black">Join Nobles</Typography>
          </Card>
          
      </Box>
         
     
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Account</Typography>
              <List>
                <ListItem  sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                  <ListItemIcon><MusicNote /></ListItemIcon>
                  <ListItemText primary="Manage your subscription" />
                </ListItem>
                <ListItem  sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                  <ListItemIcon><Edit /></ListItemIcon>
                  <ListItemText primary="Edit profile" />
                </ListItem>
                <ListItem  sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                  <ListItemIcon><SelfImprovement/></ListItemIcon>
                  <ListItemText primary="Ghost mode" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Payment</Typography>
              <List>

                <ListItem   sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                  <ListItemIcon><CreditCard /></ListItemIcon>
                  <ListItemText primary="Manage payment cards" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Security and Privacy</Typography>
              <List>
                <ListItem   sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                  <ListItemIcon> <Lock/> </ListItemIcon>
                  <ListItemText primary="Change password" />
                </ListItem>
                <ListItem  sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                  <ListItemIcon><PrivacyTip /></ListItemIcon>
                  <ListItemText primary="Account privacy" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Help</Typography>
              <List>
                <ListItem   sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                  <ListItemIcon>  <HelpCenter/> </ListItemIcon>
                  <ListItemText primary="Support" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      );
}

export default Account
