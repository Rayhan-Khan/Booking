const NewHotel = require("../models/CreateHotel");

exports.createroom = async (req, res) => {
  let {
    type,
    Name,
    Location,
    Room,
    Price,
    Breakfast,
    Offer,
    Restaurant,
    Details,
  } = req.body;

 /*  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied" });
  } */
  if (!type || !Name || !Location || !Room || !Price || !Offer) {
    return res.status(400).json({ message: "Required value empty" });
  }
   
  const room = NewHotel({
    type,
    Name,
    Location,
    Room,
    Price,
    Breakfast,
    Offer,
    Restaurant,
    Details,
  });
  const coverPhoto = req.files["coverPhoto"][0].filename;
  const RoomPhoto = req.files["RoomPhoto"].map((file) => file.filename);
  room.coverPhoto = coverPhoto;
  room.RoomPhoto = RoomPhoto;
  await room.save((error, data) => {
    if (error) {
      if(error.code===1100)
      return res.status(409).json(' Duplicate Error');

      return res.status(400).json({ error });
    }
    res.status(201).json({
      data,
    });
  });
};

exports.getRoom = async (req, res) => {
  const filter = {};
  let Sort = { Price: 1, Offer: -1 };
  let skipNumber = 0;
  if (req.query) {
    const { type, Restaurant, Breakfast, Location, Skip,Offer,Price } = req.query;
    if (type) filter.type = type;
    if (Restaurant) filter.Restaurant = Restaurant;
    if (Breakfast) filter.Breakfast = Breakfast;
    if (Location) filter.Location = Location;
    if(Offer ||Price){
      Sort={};
      if(Price)
        Sort.Price=Price;
      if(Offer)
        Sort.Offer=Offer;
    }
    skipNumber = Skip || 0;
  }
  let hotel = NewHotel.find(filter)
    .sort(Sort)
    .skip(Number(skipNumber))
    .limit(20);
  let count = NewHotel.find(filter).count();
  [hotel, count] = await Promise.all([hotel, count]);
  res.status(200).json({ hotel, count });
};

exports.singleRoom = async (req, res) => {
  await NewHotel.findById(req.params.id).exec((err, data) => {
    if (data) {
      return res.status(200).json(data);
    } else if (err.name === "CastError")
      return res.status(404).json("Not found any room");
    else if (err && process.env.NODE_ENV === "development")
      return res.status(404).json(err);
    else if (err) return res.status(404).json("something wrong");
  });
};

exports.alltype = async (req, res) => {
  const arr = ["$type", "$Location"];
  try {
    function all(value) {
      return NewHotel.aggregate([
        {
          $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            _id: value,
            count: { $sum: 1 },
            photo: { $push: "$coverPhoto" },
            minPrice: { $min: "$Price" },
            maxPrice: { $max: "$Price" },
          },
        },
        {
          $project: {
            _id: 1,
            count: 1,
            minPrice: 1,
            maxPrice: 1,
            coverPhoto: { $slice: ["$photo", 1] },
          },
        },
      ]);
    }
    const val = arr.reduce((start, end) => {
      const va = all(end);
      return [...start, va];
    }, []);
    [type, location] = await Promise.all(val);
    res.status(200).json({ type, location });
  } catch (err) {
    return res.status(200).json(err);
  }
};
