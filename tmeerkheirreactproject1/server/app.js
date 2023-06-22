const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors({ origin: "*" }));
const key = "secret";
app.use(express.json());

const cards = [
  {
    _id: "eafeswfwr2326346tf3254f",
    title: "Design Studio",
    subtitle: "Creative Solutions",
    description: "Offering innovative design services for logos, branding, and marketing materials.",
    phone: "050-1111111",
    email: "design@studio.com",
    web: "https://www.designstudio.com",
    image: {
      url: "assets/images/design-studio.png",
      alt: "image",
    },
    address: {
      state: "TLV",
      country: "Israel",
      street: "Dizingof",
      houseNumber: "1",
      city: "Tel Aviv",
      zip: "1312",
    },
    bizNumber: "1111111",
    likes: [],
    user_id: "11",
  },
  {
    _id: "daslfjhbasfjba123124123",
    title: "Tech Solutions",
    subtitle: "Transforming Businesses",
    description: "Providing cutting-edge technological solutions for businesses, including software development and automation.",
    phone: "050-1111111",
    email: "info@techsolutions.com",
    web: "https://www.techsolutions.com",
    image: {
      url: "assets/images/tech-solution.jpg",
      alt: "image",
    },
    address: {
      state: "TLV",
      country: "Israel",
      street: "Dizingof",
      houseNumber: "2",
      city: "Tel Aviv",
      zip: "1312",
    },
    bizNumber: "222222",
    likes: [],
    user_id: "22",
  },
  {
    _id: "asdfaa53sdf158as4ass",
    title: "Gourmet Catering",
    subtitle: "Delicious Food for Occasions",
    description: "Offering high-quality gourmet catering services for events, weddings, and parties.",
    phone: "050-1111111",
    email: "catering@deliciousfood.com",
    web: "https://www.deliciousfood.com",
    image: {
      url: "assets/images/gourmet-catering.png",
      alt: "image",
    },
    address: {
      state: "TLV",
      country: "Israel",
      street: "Dizingof",
      houseNumber: "3",
      city: "Tel Aviv",
      zip: "1312",
    },
    bizNumber: "333333",
    likes: [],
    user_id: "33",
  },
  {
    _id: "bsdfbb53sdfcxcx158as4ass",
    title: "Fitness Training",
    subtitle: "Achieve Your Fitness Goals",
    description: "Personalized fitness training programs tailored to help individuals reach their health and wellness goals.",
    phone: "050-1111111",
    email: "info@fitnesstraining.com",
    web: "https://www.fitnesstraining.com",
    image: {
      url: "assets/images/fitness-training.jpg",
      alt: "image",
    },
    address: {
      state: "TLV",
      country: "Israel",
      street: "Dizingof",
      houseNumber: "3",
      city: "Tel Aviv",
      zip: "1312",
    },
    bizNumber: "333333",
    likes: [],
    user_id: "22",
  },
  {
    _id: "ccsdfc53sdfcxcxjhgfds158as4ass",
    title: "Event Planning Services",
    subtitle: "Creating Memorable Experiences",
    description: "Providing comprehensive event planning services for corporate events, weddings, and special occasions.",
    phone: "050-1111111",
    email: "events@planningservices.com",
    web: "https://www.planningservices.com",
    image: {
      url: "assets/images/event-planning.jpg",
      alt: "image",
    },
    address: {
      state: "TLV",
      country: "Israel",
      street: "Dizingof",
      houseNumber: "3",
      city: "Tel Aviv",
      zip: "1312",
    },
    bizNumber: "333333",
    likes: [],
    user_id: "22",
  },
];


const users = [
    {
        name: {
            first: "Tamir",
            middle: "kheir",
            last: "kheir",
        },
        phone: "050-9562887",
        email: "admin@admin.com",
        password: "Abc1234!",
        adress: {
            state: "Kfaryasif",
            country: "israel",
            city: "Kfaryasif",
            street: "Solomon",
            zip: "2490800",
            houseNumber: "13",
        },
        image: {
            url: "www.example.com",
            alt: "profile image",
        },
        isBusiness: true,
        isAdmin: true,
        user_id: "11",
    },
    {
        name: {
            first: "Tamir1",
            middle: "kheir1",
            last: "kheir1",
        },
        phone: "050-9562887",
        email: "admin1@admin.com",
        password: "Abc1234!",
        adress: {
            state: "Kfaryasif",
            country: "israel",
            city: "Kfaryasif",
            street: "Solomon",
            zip: "2490800",
            houseNumber: "14",
        },
        image: {
            url: "www.example.com",
            alt: "profile image",
        },
        isBusiness: true,
        isAdmin: false,
        user_id: "22",
    },
    {
        name: {
            first: "Tamir2",
            middle: "kheir2",
            last: "kheir2",
        },
        phone: "050-9562887",
        email: "admin2@admin.com",
        password: "Abc1234!",
        adress: {
            state: "Kfaryasif",
            country: "israel",
            city: "Kfaryasif",
            street: "Solomon",
            zip: "2490800",
            houseNumber: "15",
        },
        image: {
            url: "www.example.com",
            alt: "profile image",
        },
        isBusiness: false,
        isAdmin: false,
        user_id: "33",
    },
];

const verifyTokenMiddleware = (req, res, next) => {
  const tokenFromClient = req.header("x-auth-token");
  if (tokenFromClient) {
    const userData = verifyToken(tokenFromClient);
    req.userId = userData.id; 
    next();
  } else {
    res.status(404).send("Login first");
  }
};

const verifyToken = (tokenFromClient) => {
    try{
        const userDataFromPayload = jwt.verify(tokenFromClient, key);
        return userDataFromPayload;
    } catch (error) {
        return null;
    }
};

app.get("/cards", (req, res)=>{
    
    res.json(cards);
});

app.get("/users", (req, res)=>{
    
    res.json(users);
});

app.get("/cards/my-cards", verifyTokenMiddleware, (req, res) => {
  const user_id = req.userId; 
  const userCards = cards.filter((c) => c.user_id === user_id);
  res.json(userCards);
});

app.get("/cards/fav-cards", (req, res) => {
    const tokenFromClient = req.header("x-auth-token");
    if (tokenFromClient) {
        const userData = verifyToken(tokenFromClient);
        const user_id = userData.id;
        const favCards = cards.filter((c) => c.likes.includes(user_id));
        res.json(favCards);
    } else {
        res.status(404).send("login first");
    }
});

app.get("/cards/:cardId", (req, res) => {
    const cardId = req.params.cardId;
    const card = cards.find((card) => card._id === cardId);
    if (!card){
        res.status(404).json({ error: "Card not found" });
    } else {
        res.json(card);
    }
});

app.get("/users/:userId", (req, res) => {
    const userId = req.params.userId;
    const user = users.find((user) => user.user_id === userId);
    if (!user){
        res.status(404).json({ error: "User not found" });
    } else {
        res.json(user);
    }
});



app.put("/cards/:id", (req, res)=>{
    const cardIndex = cards.findIndex((c) => c._id === req.params.id);
    if(cardIndex === -1){
        res.status(404).send("Card not found");
    } else {
        const updatedCard = {
            ...cards[cardIndex],
            ...req.body,
            _id: req.params.id,
        };
        cards[cardIndex] = updatedCard;
        res.json(updatedCard);
    }
});

app.patch("/cards/:id", (req, res) =>{
    const cardIndex = cards.findIndex((c) => c._id === req.params.id);
    if(cardIndex === -1){
        res.status(404).send("Card not found");
    } else {
        const tokenFromClient = req.header("x-auth-token");
        if (tokenFromClient){
            const userData = verifyToken(tokenFromClient);
            const user_id = userData.id;
            const card = cards[cardIndex];
            const userLiked = card.likes.includes(user_id);
            const updatedLikes = userLiked 
            ? card.likes.filter((id)=> id !== user_id)
            : [...card.likes, user_id];
            const updatedCard = { ...card, likes: updatedLikes};
            cards[cardIndex]=updatedCard;
            res.json(updatedCard);
    } else {
        res.status(404).send("Log in first");
    }
}
});

app.delete("/cards/:id", (req, res) => {
    const cardIndex = cards.findIndex((c) => c._id === req.params.id);
    if (cardIndex === -1){
        res.status(404).send("Card not found");
    } else {
        const deletedCard = cards.splice(cardIndex, 1)[0];
        res.json(deletedCard);
    }
});

app.post("/users/login", (req, res)=> {
    console.log(req.body);

    const { email, password } = req.body;
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user){
        res.status(401).json({ message: "Invalid email or password"});
        return;
    }
    const userDataForToken = {
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness,
        firstName: user.name.first,
        id: user.user_id,
        iat: new Date().getTime(),
    };
    const token = jwt.sign(userDataForToken, key);
    res.send(token);
});

app.post("/users", (req, res) => {
    const newUser = req.body;
    newUser.user_id = uuidv4();
    users.push(newUser);
    res.status(201).send({ message: "User added successfully." });
});




app.post("/cards", verifyTokenMiddleware, (req, res) => {
  const newCard = req.body;
  newCard.bizNumber = uuidv4();
  newCard._id = uuidv4();
  newCard.user_id = req.userId;
  cards.push(newCard);
  res.status(201).send({ message: "Card added successfully." });
});

const PORT = 8181;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));