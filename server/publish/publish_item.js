
Meteor.publish('items', function(){
    //if (Roles.userIsInRole(this.userId, 'admin')) {
        return Item.find();
    //}
});

Meteor.publish('tabular_items', function (tableName, ids, fields) {
    check(tableName, String);
    check(ids, [String]);
    check(fields, Match.Optional(Object));
    Publish.relations(this, Item.find({_id: {$in: ids}}, {fields: fields}), function (id, doc) {
        doc.group = this.changeParentDoc(Group.find({_id: doc.groupId}), function (id, doc){
                if(doc.uuid)
                  return doc.uuid;
                else
                  return doc._id;
            }, 'group');
      });
      return this.ready();
});
