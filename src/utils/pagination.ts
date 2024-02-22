// await interaction.deferReply();

// var index = 0;

// const first = new ButtonBuilder()
//   .setCustomId("first")
//   .setLabel("First Page")
//   .setStyle(ButtonStyle.Primary)
//   .setDisabled(true);

// const previous = new ButtonBuilder()
//   .setCustomId("previous")
//   .setLabel("Previous Page")
//   .setStyle(ButtonStyle.Primary);

// const next = new ButtonBuilder()
//   .setCustomId("next")
//   .setLabel("Next Page")
//   .setStyle(ButtonStyle.Primary);

// const last = new ButtonBuilder()
//   .setCustomId("last")
//   .setLabel("Last Page")
//   .setStyle(ButtonStyle.Primary);

// const pageCount = new ButtonBuilder()
//   .setCustomId("pageCount")
//   .setLabel(`${index + 1}/${pages.length}`)
//   .setStyle(ButtonStyle.Secondary)
//   .setDisabled(true);

// const buttons =
//   new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents([
//     (first, previous, next, last, pageCount),
//   ]);
// const msg = await interaction.editReply({
//   embeds: [pages[index]],
//   components: [buttons],
// });

// Collector.on("colect", async (i) => {
//   if (i.user.id !== interaction.user.id)
//     return await i.reply(
//       `You cannot interact with this button, only ${interaction.user.displayName} can use these buttons!`
//     );

//   if (i.customId === "first") {
//     index = 0;
//     pageCount.setLabel(`${index + 1}/${pages.length}`);
//   } else if (i.customId === "previous") {
//     if (index > 0) {
//       index = pages.length - 1;
//       pageCount.setLabel(`${index + 1}/${pages.length}`);
//     } else if (i.customId === "next") {
//       index++;
//       pageCount.setLabel(`${index + 1}/${pages.length}`);
//     }
//   }

//   first.setDisabled(index === 0);
//   prev.setDisabled(index === 0);
//   next.setDisabled(index === pages.length - 1);
//   last.setDisabled(index === pages.length - 1);

//   await msg
//     .edit({
//       embeds: [pages[index]],
//       components: [buttons],
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   return msg;
// });
