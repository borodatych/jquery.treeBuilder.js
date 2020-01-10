$.fn.extend({
    treeBuilder: function (o) {

        let iconOpened = 'glyphicon glyphicon-minus-sign';
        let iconClosed = 'glyphicon glyphicon-plus-sign';
        let subMenuRoot = 'tree-submenu';
        let collapseMenuItems = false;
        let hideClass = 'd-none';
        let showClass = 'd-block';
        let openClass = 'tz-menu__item--open';   /// Пока не используется
        let closeClass = 'tz-menu__item--close'; /// Пока не используется

        if( typeof o !== 'undefined' ){
            if( typeof o.iconOpened !== 'undefined' ) iconOpened = o.iconOpened;
            if( typeof o.iconClosed !== 'undefined' ) iconClosed = o.iconClosed;
            if( typeof o.subMenuRoot !== 'undefined' ) subMenuRoot = o.subMenuRoot;

            if( typeof o.collapseMenuItems !== 'undefined' ) collapseMenuItems = o.collapseMenuItems;

            if( typeof o.hideClass !== 'undefined' ) hideClass = o.hideClass;
            if( typeof o.showClass !== 'undefined' ) showClass = o.showClass;
            if( typeof o.openClass !== 'undefined' ) openClass = o.openClass;
            if( typeof o.closeClass !== 'undefined' ) closeClass = o.closeClass;
        }

        /// Пока прошито
        let branchClass = 'item__branch';

        //initialize each of the top levels
        let $tree = $(this);
        $tree.addClass("tree");
        $tree.find('li').not("ul").each(function(){
            $(this).addClass('item__link');
        });
        $tree.find('li').has("ul").each(function(){
            let $branch = $(this); //li with children ul
            $branch.prepend("<i class='indicator " + iconClosed + " pointer'></i>");
            $branch.addClass(branchClass);
            $branch.on('click', function(e){
                let $item = $(this);
                if( this === e.target ){
                    let $icon = $item.children('i:first');
                    $icon.toggleClass(iconOpened + " " + iconClosed);
                    $item.find('.'+subMenuRoot).toggleClass(showClass + " " + hideClass);
                }
            });
            if( collapseMenuItems ) $branch.find('.'+subMenuRoot).addClass(hideClass);
        });
        //fire event from the dynamically added icon
        $tree.find('.branch .indicator').each(function(){
            $(this).on('click', function(){
                $(this).closest('li').click();
            });
        });
        //fire event to open branch if the li contains an anchor instead of text
        $tree.find('.'+branchClass+'>a').each(function(){
            $(this).on('click', function(e){
                $(this).closest('li').click();
                e.preventDefault();
            });
        });
        //fire event to open branch if the li contains a button instead of text
        $tree.find('.'+branchClass+'>button').each(function(){
            $(this).on('click', function(e){
                $(this).closest('li').click();
                e.preventDefault();
            });
        });
    }
});
/// https://bootsnipp.com/snippets/ypNAe
/// Initialization of treeviews
/*
$('#tz-tree').treeBuilder({
    iconOpened:'fa fa-folder-open',
    iconClosed:'fa fa-folder',
    subMenuRoot:'tree-submenu',
    collapseMenuItems: true,
    hideClass: 'd-none',
    showClass: 'd-block',
    openClass: 'tz-menu__item--open',
    closeClass: 'tz-menu__item--close',
  });
*/
