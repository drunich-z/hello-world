// let newWord;
      // let newTranslation;
      // let picture;
      // let sound;
      // let catId;

      // if (!Array.isArray(fields.word) && fields.word) newCard.word = fields.word;
      // if (!Array.isArray(fields.translation) && fields.translation) newCard.translation = fields.translation;
      // if (!Array.isArray(fields.categoryId) && fields.categoryId) newCard.categoryId = Number(fields.categoryId);
      // if (!Array.isArray(files.picture)) picture = files.picture;
      // if (!Array.isArray(files.sound)) sound = files.sound;

      // if (!newWord && !newTranslation && !picture && !sound) {
      //   throw new Error('smt wrong with parsing formdata');
      // }

      // const imagePath = `${PUBLIC_PICTURE_PATH}${updateFile(picture as Formidable.File, pictsPath, newWord as string)}`;
      // const soundPath = `${PUBLIC_SOUND_PATH}${updateFile(sound as Formidable.File, soundsPath, newWord as string)}`;

      // const newCard: Card = {
      //   word: newWord as string,
      //   translation: newTranslation as string,
      //   image: imagePath,
      //   audio: soundPath,
      //   categoryId: catId as number,
      // };
      // try {
      //   const data = await createCard(newCard);
      //   return res.json(data);
      // } catch (error) {
      //   throw new Error(error);
      // }
