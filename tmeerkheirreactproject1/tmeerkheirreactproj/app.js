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
    title: "first",
    subtitle: "subTitle",
    description: "testing",
    phone: "050-1111111",
    email: "text@text.com",
    web: "https://www.test.co.il",
    image: {
        url: "assets/images/business-card-top-image.jpg",
    alt: "image",
},
address: {
    state: "TLV",
    country: "israel",
    street: "Dizingof",
    houseNumber: "1",
    city: "Tel Aviv",
    zip: 1312,
},
bizNumber: 1111111,
likes: [],
user_id: "11",
},
{
    _id: "daslfjhbasfjba123124123",
    title: "second",
    subtitle: "subTitle",
    description: "testing",
    phone: "050-1111111",
    email: "text@text.com",
    web: "https://www.test.co.il",
    image: {
        url: "assets/images/business-card-top-image.jpg",
        alt: "image",
    },
    address: {
        state: "TLV",
        country: "israel",
        street: "Dizingof",
        houseNumber: "2",
        city: "Tel Aviv",
        zip:1312,
    },
    bizNumber: 222222,
    likes: [],
    user_id: "22",
    },
    {
        _id: "asdfaa53sdf158as4ass",
        title: "third",
        subtitle: "subTitle",
        description: "testing",
        phone: "050-1111111",
        email: "text@text.com",
        web: "https://www.test.co.il",
        image: {
            url: "assets/images/business-card-top-image.jpg",
        alt: "image",
        },
        address: {
        state: "TLV",
        country: "israel",
        street: "Dizingof",
        houseNumber: "3",
        city: "Tel Aviv",
        zip:1312,
        },
        bizNumber: 333333,
        likes: [],
        user_id: "33",
    },
    {
        _id: "asdfaa53sdfcxcx158as4ass",
        title: "thivcrd",
        subtitle: "subTitle",
        description: "testing",
        phone: "050-1111111",
        email: "text@text.com",
        web: "https://www.test.co.il",
        image: {
            url: "assets/images/business-card-top-image.jpg",
        alt: "image",
        },
        address: {
        state: "TLV",
        country: "israel",
        street: "Dizingof",
        houseNumber: "3",
        city: "Tel Aviv",
        zip:1312,
        },
        bizNumber: 333333,
        likes: [],
        user_id: "22",
    },
    {
        _id: "asdfaa53sdfcxcxjhgfds158as4ass",
        title: "thivcrd",
        subtitle: "subTitle",
        description: "testing",
        phone: "050-1111111",
        email: "text@text.com",
        web: "https://www.test.co.il",
        image: {
            url: "assets/images/business-card-top-image.jpg",
        alt: "image",
        },
        address: {
        state: "TLV",
        country: "israel",
        street: "Dizingof",
        houseNumber: "3",
        city: "Tel Aviv",
        zip:1312,
        },
        bizNumber: 333333,
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
            zip: 2490800,
            houseNumber: 13,
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
            zip: 2490800,
            houseNumber: 14,
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
            zip: 2490800,
            houseNumber: 15,
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

const verifyToken = (tokenFromClient) => {
    try{
        const userDataFromPayload = jwt.verify(tokenFromClient, key);
        return userDataFromPayload;
    } catch (error) {
        return null;
    }
};

app.get("/cards", (req, res)=>{
    //res.status(404).send("Page not found");
    //setTimeout(()=> res.json(cards), 3000);
    res.json(cards);
});

app.get("/users", (req, res)=>{
    //res.status(404).send("Page not found");
    //setTimeout(()=> res.json(cards), 3000);
    res.json(users);
});

app.get("/cards/my-cards", (req, res) => {
    const tokenFromClient = req.header("x-auth-token");
    if (tokenFromClient) {
        const userData = verifyToken(tokenFromClient);
        const user_id = userData.id;
        const userCards = cards.filter((c) => c.user_id === user_id);
        res.json(userCards);
    } else {
        res.status(404).send("login first");
    }
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

app.post("/cards", (req, res)=>{
    const newId = Date.now().toString();
    const newCardWithId = { ...req.body, _id: newId};
    cards.push(newCardWithId);
    res.json(newCardWithId);
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
            console.log(updatedCard);
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

const PORT = 8181;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));